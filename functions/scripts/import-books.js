const { randomUUID } = require('node:crypto');
const path = require('node:path');
const { readFile } = require('node:fs/promises');
const { applicationDefault, initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

const projectId = process.env.FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
if (!projectId || !storageBucket) {
  throw new Error('Définir FIREBASE_PROJECT_ID et FIREBASE_STORAGE_BUCKET avant l’import.');
}

initializeApp({
  credential: applicationDefault(),
  projectId,
  storageBucket,
});

const db = getFirestore();
const bucket = getStorage().bucket();
const sourcePath = path.resolve(__dirname, '../../src/assets/data/books.json');
const coversDirectory = path.resolve(__dirname, '../../src/assets/img');

async function main() {
  const books = JSON.parse(await readFile(sourcePath, 'utf8'));
  let imported = 0;
  let skipped = 0;

  for (const book of books) {
    const id = String(book.isbn || book.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const bookRef = db.collection('books').doc(id);
    if ((await bookRef.get()).exists) {
      skipped += 1;
      continue;
    }

    const imageName = path.basename(book.coverImagePath || '');
    const imagePath = path.join(coversDirectory, imageName);
    const destination = `books/${id}/${imageName}`;
    const imageFile = bucket.file(destination);
    const token = randomUUID();
    const extension = path.extname(imageName).toLowerCase();
    const contentType = extension === '.png' ? 'image/png' : 'image/jpeg';
    await bucket.upload(imagePath, {
      destination,
      metadata: {
        contentType,
        metadata: { firebaseStorageDownloadTokens: token },
      },
    });

    const coverImageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(destination)}?alt=media&token=${token}`;
    await bookRef.set({
      title: book.name,
      description: book.description,
      price: Number(book.price),
      isbn: book.isbn,
      stripePriceId: book.stripePriceId || book.stripeProductId || null,
      link_buy: book.link_buy || '',
      coverImageStoragePath: imageFile.name,
      coverImageUrl,
      importedAt: FieldValue.serverTimestamp(),
    });
    imported += 1;
  }

  console.log(`Import terminé : ${imported} livre(s), ${skipped} déjà présent(s).`);
}

main().catch((error) => {
  console.error('Échec de l’import du catalogue :', error);
  process.exitCode = 1;
});
