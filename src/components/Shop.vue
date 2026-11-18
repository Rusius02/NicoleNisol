<template>
  <section class="shop-page page-shell">
    <header class="page-heading">
      <p class="page-kicker">{{ $t('shop') }}</p>
      <h1 class="page-title">La librairie de Nicole</h1>
      <p class="page-intro">{{ $t('welcome.line5') }}</p>
    </header>

    <div v-if="loading" class="shop-state">
      <v-progress-circular indeterminate color="primary" />
      <p>Chargement des livres...</p>
    </div>

    <div v-else-if="error" class="shop-state shop-state--error" role="alert">
      <v-icon size="32">mdi-alert-circle-outline</v-icon>
      <p>{{ error }}</p>
    </div>

    <div v-else-if="books.length === 0" class="shop-state">
      <v-icon size="32">mdi-book-open-page-variant-outline</v-icon>
      <p>Aucun livre n’est disponible pour le moment.</p>
    </div>

    <div v-else class="book-grid">
      <BookItem
        v-for="(book, index) in books"
        :key="book.id || index"
        :title="book.title || book.name"
        :description="book.description"
        :cover-image-path="book.coverImageUrl || book.coverImagePath"
        :price="book.price"
        :link-buy="book.link_buy"
        :price-i-d-from-stripe="book.stripePriceId || book.stripeProductId"
        :is-left-aligned="index % 2 === 0"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'ShopView'
};
</script>

<script setup>
import { ref, onMounted } from 'vue';
import BookItem from './BookItem.vue';
import { bookService } from '@/services/bookService';

const books = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
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
.shop-page {
  min-height: 70vh;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: clamp(1rem, 2.5vw, 1.75rem);
}

.shop-state {
  display: grid;
  min-height: 260px;
  place-content: center;
  justify-items: center;
  gap: 0.75rem;
  color: var(--color-muted);
  text-align: center;
}

.shop-state p {
  margin: 0;
}

.shop-state--error {
  color: #9c3d4d;
}
</style>
