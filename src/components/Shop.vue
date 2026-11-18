<template>
  <div class="shop-wrapper">
    <div v-if="loading" class="loading-state">
      <p>Chargement des livres de Nicole...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="books.length === 0" class="empty-state">
      <p>Aucun livre n’est disponible dans la collection Firestore « books ».</p>
    </div>

    <div v-else class="book-container">
      <BookItem
        v-for="(book, index) in books"
        :key="book.id || index"
        :title="book.title || book.name" 
        :description="book.description"
        :coverImagePath="book.coverImageUrl || book.coverImagePath"
        :price="book.price"
        :linkBuy="book.link_buy"
        :priceIDFromStripe="book.stripePriceId || book.stripeProductId"
        :isLeftAligned="index % 2 === 0"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopView'
}
</script>

<script setup>
import { ref, onMounted } from 'vue';
import BookItem from './BookItem.vue';
import { bookService } from '@/services/bookService';

// Déclaration de nos états réactifs
const books = ref([]);
const loading = ref(true);
const error = ref(null);

// Cycle de vie : Exécution de l'appel API dès que le composant est monté
onMounted(async () => {
  try {
    loading.value = true;
    books.value = await bookService.getAll();
  } catch (err) {
    console.error('Erreur lors de la récupération des livres:', err);
    error.value = err.message
      ? `Impossible de charger le catalogue : ${err.message}`
      : 'Impossible de charger le catalogue pour le moment.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.shop-wrapper {
  width: 100%;
  padding: 20px 0;
}

.book-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}

.loading-state, .error-state {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}

.error-state {
  color: #e74c3c;
}

/* Media query for computer screens */
@media screen and (min-width: 768px) {
  :deep(.book-item) {
    width: 50%; /* Display two items per row */
  }
}

/* Media query for mobile devices */
@media screen and (max-width: 767px) {
  :deep(.book-item) {
    width: 100%; /* Display one item per row */
  }
}
</style>