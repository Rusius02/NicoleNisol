const { applicationDefault, initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const uid = process.argv[2];
const projectId = process.env.FIREBASE_PROJECT_ID;
if (!uid || !projectId) {
  throw new Error('Usage: npm run set-admin -- <uid> avec FIREBASE_PROJECT_ID défini.');
}

initializeApp({
  credential: applicationDefault(),
  projectId,
});

async function main() {
  const auth = getAuth();
  const user = await auth.getUser(uid);
  await auth.setCustomUserClaims(uid, { ...user.customClaims, admin: true });
  console.log(`Droits administrateur accordés à ${uid}.`);
}

main().catch((error) => {
  console.error('Impossible de définir le rôle administrateur :', error);
  process.exitCode = 1;
});
