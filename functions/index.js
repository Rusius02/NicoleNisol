const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');
const { defineSecret, defineString } = require('firebase-functions/params');
const { HttpsError, onCall, onRequest } = require('firebase-functions/v2/https');
const Stripe = require('stripe');

initializeApp();

const REGION = 'europe-west1';
const db = getFirestore();
const stripeSecretKey = defineSecret('STRIPE_SECRET_KEY');
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET');
const shippingRates = defineString('SHIPPING_RATES_EUR_CENTS', { default: '{}' });

function requireUser(request) {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Connexion requise.');
  }
  return request.auth.uid;
}

function requireAdmin(request) {
  const uid = requireUser(request);
  if (request.auth.token.admin !== true) {
    throw new HttpsError('permission-denied', 'Droits administrateur requis.');
  }
  return uid;
}

function getShippingAmount(address) {
  if (!address || typeof address.country !== 'string' || typeof address.postalCode !== 'string') {
    throw new HttpsError('invalid-argument', 'Adresse de livraison invalide.');
  }

  let rates;
  try {
    rates = JSON.parse(shippingRates.value());
  } catch (error) {
    throw new HttpsError('failed-precondition', 'La configuration des frais de port est invalide.');
  }

  const amount = rates[address.country.toUpperCase()];
  if (!Number.isInteger(amount) || amount < 0) {
    throw new HttpsError('failed-precondition', `Aucun tarif de livraison configuré pour ${address.country}.`);
  }
  return amount;
}

function stripeClient() {
  return new Stripe(stripeSecretKey.value());
}

exports.estimateShipping = onCall({ region: REGION, enforceAppCheck: true }, (request) => ({
  amount: getShippingAmount(request.data),
}));

exports.createPaymentIntent = onCall({
  region: REGION,
  enforceAppCheck: true,
  secrets: [stripeSecretKey],
}, async (request) => {
  const uid = requireUser(request);
  const { books, shipping } = request.data || {};
  if (!Array.isArray(books) || books.length === 0 || books.length > 50) {
    throw new HttpsError('invalid-argument', 'Le panier est vide ou invalide.');
  }

  const orderLines = await Promise.all(books.map(async (line) => {
    const { bookId, quantity } = line || {};
    if (typeof bookId !== 'string' || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new HttpsError('invalid-argument', 'Un article du panier est invalide.');
    }

    const snapshot = await db.collection('books').doc(bookId).get();
    if (!snapshot.exists) throw new HttpsError('not-found', `Livre introuvable : ${bookId}`);
    const book = snapshot.data();
    const unitPriceCents = Math.round(Number(book.price) * 100);
    if (!Number.isSafeInteger(unitPriceCents) || unitPriceCents < 1) {
      throw new HttpsError('failed-precondition', `Prix invalide pour le livre ${bookId}.`);
    }
    return {
      bookId,
      title: String(book.title || book.name || ''),
      unitPriceCents,
      quantity,
    };
  }));

  const shippingAmount = getShippingAmount(shipping);
  const amount = orderLines.reduce((total, line) => (
    total + line.unitPriceCents * line.quantity
  ), shippingAmount);
  if (!Number.isSafeInteger(amount) || amount < 50 || amount > 99999999) {
    throw new HttpsError('invalid-argument', 'Le montant de commande est invalide.');
  }

  const orderRef = db.collection('orders').doc();
  const intent = await stripeClient().paymentIntents.create({
    amount,
    currency: 'eur',
    automatic_payment_methods: { enabled: true },
    metadata: { orderId: orderRef.id, userId: uid },
  });

  await orderRef.set({
    userId: uid,
    books: orderLines,
    shipping,
    shippingAmount,
    amount,
    currency: 'eur',
    paymentStatus: 'pending',
    stripePaymentIntentId: intent.id,
    createdAt: FieldValue.serverTimestamp(),
  });

  return { clientSecret: intent.client_secret };
});

exports.stripeWebhook = onRequest({
  region: REGION,
  secrets: [stripeSecretKey, stripeWebhookSecret],
}, async (request, response) => {
  let event;
  try {
    event = stripeClient().webhooks.constructEvent(
      request.rawBody,
      request.headers['stripe-signature'],
      stripeWebhookSecret.value(),
    );
  } catch (error) {
    response.status(400).send('Invalid Stripe signature');
    return;
  }

  const paymentIntent = event.data.object;
  const orderId = paymentIntent.metadata && paymentIntent.metadata.orderId;
  if (orderId && event.type === 'payment_intent.succeeded') {
    await db.collection('orders').doc(orderId).update({
      paymentStatus: 'paid',
      paidAt: FieldValue.serverTimestamp(),
    });
  } else if (orderId && event.type === 'payment_intent.payment_failed') {
    await db.collection('orders').doc(orderId).update({
      paymentStatus: 'failed',
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  response.json({ received: true });
});

exports.adminListUsers = onCall({ region: REGION, enforceAppCheck: true }, async (request) => {
  requireAdmin(request);
  const result = await getAuth().listUsers(1000);
  const profileSnapshots = await Promise.all(result.users.map((user) => (
    db.collection('userProfiles').doc(user.uid).get()
  )));

  return result.users.map((user, index) => ({
    uid: user.uid,
    id: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    disabled: user.disabled,
    ...(profileSnapshots[index].exists ? profileSnapshots[index].data() : {}),
    role: user.customClaims.admin === true ? 'admin' : 'customer',
  }));
});

exports.adminUpdateUser = onCall({ region: REGION, enforceAppCheck: true }, async (request) => {
  requireAdmin(request);
  const user = request.data || {};
  if (typeof user.uid !== 'string') {
    throw new HttpsError('invalid-argument', 'Identifiant utilisateur invalide.');
  }

  const authUpdate = {};
  if (typeof user.email === 'string') authUpdate.email = user.email;
  if (typeof user.displayName === 'string') authUpdate.displayName = user.displayName;
  if (typeof user.firstName === 'string' || typeof user.lastName === 'string') {
    authUpdate.displayName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
  }
  if (Object.keys(authUpdate).length > 0) {
    await getAuth().updateUser(user.uid, authUpdate);
  }
  await db.collection('userProfiles').doc(user.uid).set({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    pseudo: user.pseudo || '',
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  return { success: true };
});

exports.adminDeleteUser = onCall({ region: REGION, enforceAppCheck: true }, async (request) => {
  const requesterUid = requireAdmin(request);
  const uid = request.data && request.data.uid;
  if (typeof uid !== 'string' || !uid) {
    throw new HttpsError('invalid-argument', 'Identifiant utilisateur invalide.');
  }
  if (uid === requesterUid) {
    throw new HttpsError('failed-precondition', 'Vous ne pouvez pas supprimer votre propre compte administrateur.');
  }
  await getAuth().deleteUser(uid);
  await db.collection('userProfiles').doc(uid).delete();
  return { success: true };
});

exports.adminListOrders = onCall({ region: REGION, enforceAppCheck: true }, async (request) => {
  requireAdmin(request);
  const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').limit(200).get();
  return snapshot.docs.map((order) => ({ id: order.id, ...order.data() }));
});

exports.registerVisit = onCall({ region: REGION, enforceAppCheck: true }, async () => {
  const day = new Date().toISOString().slice(0, 10);
  await db.collection('siteVisits').doc(day).set({
    day,
    count: FieldValue.increment(1),
  }, { merge: true });
  return { success: true };
});

exports.adminGetVisitStatistics = onCall({ region: REGION, enforceAppCheck: true }, async (request) => {
  requireAdmin(request);
  const start = new Date();
  start.setUTCDate(1);
  start.setUTCMonth(start.getUTCMonth() - 11);
  const firstDay = start.toISOString().slice(0, 10);
  const snapshot = await db.collection('siteVisits').where('day', '>=', firstDay).get();
  const monthlyCounts = new Map();

  snapshot.docs.forEach((visit) => {
    const month = visit.data().day.slice(0, 7);
    monthlyCounts.set(month, (monthlyCounts.get(month) || 0) + visit.data().count);
  });

  const labels = [];
  const values = [];
  const cursor = new Date();
  cursor.setUTCDate(1);
  cursor.setUTCMonth(cursor.getUTCMonth() - 11);
  for (let index = 0; index < 12; index += 1) {
    const month = cursor.toISOString().slice(0, 7);
    labels.push(month);
    values.push(monthlyCounts.get(month) || 0);
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return { labels, values };
});
