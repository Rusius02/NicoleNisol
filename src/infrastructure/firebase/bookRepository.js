import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { getFirebaseServices } from './firebase';

const COLLECTION = 'books';

async function toBook(snapshot, storage) {
  const data = snapshot.data();
  let coverImageUrl = data.coverImageUrl || data.coverImagePath || '';

  if (coverImageUrl && !/^https?:\/\//i.test(coverImageUrl) && !/^data:/i.test(coverImageUrl)) {
    try {
      coverImageUrl = await getDownloadURL(ref(storage, coverImageUrl.replace(/^\/+/, '')));
    } catch (error) {
      console.error(`Impossible de résoudre l'image du livre "${snapshot.id}".`, error);
      coverImageUrl = '';
    }
  }

  return {
    ...data,
    id: snapshot.id,
    title: data.title || data.name || '',
    coverImageUrl,
    coverImagePath: coverImageUrl,
  };
}

async function uploadCover(storage, id, imageFile) {
  if (!imageFile) return null;

  const imageRef = ref(storage, `books/${id}/${Date.now()}-${imageFile.name}`);
  await uploadBytes(imageRef, imageFile, { contentType: imageFile.type });
  return {
    coverImageStoragePath: imageRef.fullPath,
    coverImageUrl: await getDownloadURL(imageRef),
  };
}

export const bookRepository = {
  async getAll() {
    const { db, storage } = getFirebaseServices();
    const snapshot = await getDocs(collection(db, COLLECTION));
    return Promise.all(snapshot.docs.map((book) => toBook(book, storage)));
  },

  async getById(id) {
    const { db, storage } = getFirebaseServices();
    const snapshot = await getDoc(doc(db, COLLECTION, id));
    return snapshot.exists() ? toBook(snapshot, storage) : null;
  },

  async getByStripeId(stripeId) {
    const { db, storage } = getFirebaseServices();
    const [byPriceId, byLegacyProductId] = await Promise.all([
      getDocs(query(collection(db, COLLECTION), where('stripePriceId', '==', stripeId))),
      getDocs(query(collection(db, COLLECTION), where('stripeProductId', '==', stripeId))),
    ]);
    const match = byPriceId.docs[0] || byLegacyProductId.docs[0];
    return match ? toBook(match, storage) : null;
  },

  async create(bookData, imageFile) {
    const { db, storage } = getFirebaseServices();
    const bookRef = doc(collection(db, COLLECTION));
    const cover = await uploadCover(storage, bookRef.id, imageFile);
    const data = { ...bookData };
    delete data.id;
    await setDoc(bookRef, {
      ...data,
      ...cover,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { ...data, ...cover, id: bookRef.id };
  },

  async update(id, bookData, imageFile) {
    const { db, storage } = getFirebaseServices();
    const bookRef = doc(db, COLLECTION, id);
    const snapshot = await getDoc(bookRef);
    if (!snapshot.exists()) throw new Error(`Livre introuvable : ${id}`);

    const oldData = snapshot.data();
    const cover = await uploadCover(storage, id, imageFile);
    const data = { ...bookData };
    delete data.id;
    await updateDoc(bookRef, {
      ...data,
      ...(cover || {}),
      updatedAt: serverTimestamp(),
    });

    if (cover && oldData.coverImageStoragePath) {
      await deleteObject(ref(storage, oldData.coverImageStoragePath));
    }

    return { ...oldData, ...data, ...cover, id };
  },

  async delete(id) {
    const { db, storage } = getFirebaseServices();
    const bookRef = doc(db, COLLECTION, id);
    const snapshot = await getDoc(bookRef);
    if (!snapshot.exists()) return;

    const { coverImageStoragePath } = snapshot.data();
    await deleteDoc(bookRef);
    if (coverImageStoragePath) {
      await deleteObject(ref(storage, coverImageStoragePath));
    }
  },
};
