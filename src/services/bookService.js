import api from './api'; // Import de l'instance configurée ci-dessus

export const bookService = {
  /**
   * Récupérer tous les livres
   */
  async getAll() {
    const response = await api.get('/books');
    return response.data;
  },

  /**
   * Récupérer un livre par son ID unique Firestore
   */
  async getById(id) {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  /**
   * Récupérer un livre via son ID Stripe de tarification
   */
  async getByStripeId(stripeId) {
    const response = await api.get(`/books/stripe/${stripeId}`);
    return response.data;
  },

  /**
   * Créer un livre (Espace Admin de ta maman)
   * Gère l'envoi d'un fichier brut (image) via FormData
   * @param {Object} bookData Les données du livre (title, price, description, quantityInStock...)
   * @param {File|null} imageFile Le fichier d'image sélectionné via un <input type="file">
   */
  async create(bookData, imageFile) {
    const formData = new FormData();

    // 1. On sérialise les données textuelles du livre dans le formulaire multipart
    Object.keys(bookData).forEach((key) => {
      formData.append(key, bookData[key]);
    });

    // 2. On injecte le fichier d'image capturé si présent
    if (imageFile) {
      formData.append('image', imageFile); // 'image' doit correspondre exactement à upload.single('image')
    }

    const response = await api.post('/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Indispensable pour Multer
      },
    });
    return response.data;
  },

  /**
   * Mettre à jour un livre (Espace Admin)
   * @param {string} id ID unique du livre à modifier
   * @param {Object} bookData Données partielles ou complètes à modifier
   * @param {File|null} imageFile Nouvelle image optionnelle
   */
  async update(id, bookData, imageFile) {
    const formData = new FormData();

    Object.keys(bookData).forEach((key) => {
      formData.append(key, bookData[key]);
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await api.put(`/books/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Supprimer définitivement un livre du catalogue
   */
  async delete(id) {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },

  /**
   * Consulter l'état exact du stock d'un livre
   */
  async getStock(id) {
    const response = await api.get(`/books/${id}/stock`);
    return response.data; // Renvoie un objet du style { quantityInStock: X }
  },

  /**
   * Modifier directement le niveau de stock d'un livre
   * @param {string} id ID du livre
   * @param {number} newStock Nouvelle valeur du stock
   */
  async updateStock(id, newStock) {
    const response = await api.put(`/books/${id}/stock`, {
      quantityInStock: Number(newStock),
    });
    return response.data;
  },
};