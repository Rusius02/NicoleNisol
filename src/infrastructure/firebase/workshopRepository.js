import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { getFirebaseServices } from './firebase';

const workshopsCollection = () => collection(getFirebaseServices().db, 'workshops');

export const workshopRepository = {
  async getAll() {
    const snapshot = await getDocs(query(workshopsCollection(), orderBy('startDate')));
    return snapshot.docs.map((item) => ({ ...item.data(), id: item.id }));
  },

  async create(workshop) {
    const data = { ...workshop };
    delete data.id;
    const result = await addDoc(workshopsCollection(), data);
    return { ...data, id: result.id };
  },

  async update(id, workshop) {
    const data = { ...workshop };
    delete data.id;
    await updateDoc(doc(workshopsCollection(), id), data);
    return { ...data, id };
  },

  async delete(id) {
    await deleteDoc(doc(workshopsCollection(), id));
  },
};
