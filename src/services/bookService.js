import { doc, updateDoc } from 'firebase/firestore';
import { bookRepository } from '@/infrastructure/firebase/bookRepository';
import { getFirebaseServices } from '@/infrastructure/firebase/firebase';

export const bookService = {
  getAll: () => bookRepository.getAll(),
  getById: (id) => bookRepository.getById(id),
  getByStripeId: (stripeId) => bookRepository.getByStripeId(stripeId),
  create: (bookData, imageFile) => bookRepository.create(bookData, imageFile),
  update: (id, bookData, imageFile) => bookRepository.update(id, bookData, imageFile),
  delete: (id) => bookRepository.delete(id),

  async getStock(id) {
    const book = await bookRepository.getById(id);
    if (!book) throw new Error(`Livre introuvable : ${id}`);
    return { quantityInStock: Number(book.quantityInStock || 0) };
  },

  async updateStock(id, newStock) {
    const quantityInStock = Number(newStock);
    if (!Number.isInteger(quantityInStock) || quantityInStock < 0) {
      throw new Error('Le stock doit être un entier positif ou nul.');
    }

    const { db } = getFirebaseServices();
    await updateDoc(doc(db, 'books', id), { quantityInStock });
    return { quantityInStock };
  },
};