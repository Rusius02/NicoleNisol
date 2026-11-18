import { getApp, getApps, initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const TEST_PROJECT_ID = 'nicolenisoltest';
const PRODUCTION_PROJECT_ID = 'nicolenisol-67fe2';
let appCheck;

function getAppCheckSiteKey() {
  const siteKey = (import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY || '').trim();
  if (!siteKey || /^(VOTRE_CLE|YOUR_|<|PLACEHOLDER)/i.test(siteKey)) return '';
  return siteKey;
}

export function isFirebaseConfigured() {
  return Object.values(config).every(Boolean);
}

export function isAppCheckConfigured() {
  return Boolean(getAppCheckSiteKey());
}

export function getFirebaseServices() {
  const isProductionBuild = import.meta.env.MODE === 'production';
  if (isProductionBuild && config.projectId !== PRODUCTION_PROJECT_ID) {
    throw new Error('Le build de production doit utiliser le projet Firebase de production.');
  }
  if (!isProductionBuild && config.projectId !== TEST_PROJECT_ID) {
    throw new Error('Le développement local doit utiliser le projet Firebase de test.');
  }

  const missingValues = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => `VITE_FIREBASE_${key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}`);

  if (missingValues.length > 0) {
    throw new Error(`Configuration Firebase manquante : ${missingValues.join(', ')}`);
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(config);
  const appCheckSiteKey = getAppCheckSiteKey();
  if (appCheckSiteKey && !appCheck) {
    const isProductionBuild = import.meta.env.MODE === 'production';
    const useDebugAppCheck = !isProductionBuild
      && import.meta.env.DEV
      && import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG === 'true';
    if (useDebugAppCheck) {
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  }

  return {
    auth: getAuth(app),
    db: getFirestore(app),
    functions: getFunctions(app, import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION || 'europe-west1'),
    storage: getStorage(app),
  };
}
