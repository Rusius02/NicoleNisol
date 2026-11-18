import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getFirebaseServices, isFirebaseConfigured } from '@/infrastructure/firebase/firebase';

const authService = {
  async register(profile, password) {
    const { auth, db } = getFirebaseServices();
    const credential = await createUserWithEmailAndPassword(auth, profile.email, password);
    const displayName = `${profile.firstName} ${profile.lastName}`.trim();

    try {
      await updateProfile(credential.user, { displayName });
      await setDoc(doc(db, 'userProfiles', credential.user.uid), {
        firstName: profile.firstName,
        lastName: profile.lastName,
        sexe: profile.sexe,
        birthDate: profile.birthDate,
        email: profile.email,
        pseudo: profile.pseudo,
        role: 'customer',
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      try {
        await deleteUser(credential.user);
      } catch (cleanupError) {
        throw new Error(`${error.message} Le compte incomplet n’a pas pu être annulé : ${cleanupError.message}`);
      }
      throw error;
    }

    return credential.user;
  },

  async login(email, password) {
    const { auth } = getFirebaseServices();
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  },

  async logout() {
    const { auth } = getFirebaseServices();
    await signOut(auth);
  },

  async getCurrentUser() {
    if (!isFirebaseConfigured()) return null;
    const { auth } = getFirebaseServices();
    await auth.authStateReady();
    return auth.currentUser;
  },

  async isAdmin() {
    const { auth } = getFirebaseServices();
    await auth.authStateReady();
    if (!auth.currentUser) return false;
    const token = await auth.currentUser.getIdTokenResult();
    return token.claims.admin === true;
  },

  subscribe(onChange, onError) {
    if (!isFirebaseConfigured()) {
      onChange(null);
      return () => {};
    }
    return onAuthStateChanged(getFirebaseServices().auth, onChange, onError);
  },

  clearLegacySession() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },
};

export default authService;
