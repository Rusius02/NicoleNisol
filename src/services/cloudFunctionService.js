import { httpsCallable } from 'firebase/functions';
import {
  getFirebaseServices,
  isAppCheckConfigured,
} from '@/infrastructure/firebase/firebase';

export async function callCloudFunction(name, payload = {}) {
  if (!isAppCheckConfigured()) {
    throw new Error('Les Cloud Functions requièrent une vraie clé reCAPTCHA App Check.');
  }
  const { functions } = getFirebaseServices();
  const result = await httpsCallable(functions, name)(payload);
  return result.data;
}
