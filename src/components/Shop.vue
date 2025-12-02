<!-- Shop.vue -->

<template>
  <div class="book-container">
    <BookItem
      v-for="(book, index) in books"
      :key="index"
      :title="book.name"
      :description="book.description"
      :coverImagePath="book.coverImagePath"
      :price="book.price"
      :linkBuy="book.link_buy"
      :priceIDFromStripe="book.stripeProductId"
      :isLeftAligned="index % 2 === 0"
    />
  </div>
</template>

<script>
import BookItem from './BookItem.vue';

// ⭐ Import du JSON local
import booksData from '../assets/data/books.json';

export default {
  name: 'ShopView',
  components: {
    BookItem,
  },
  data() {
    return {
      books: booksData, // ⭐ On injecte directement les livres
    };
  },
};
</script>

<style scoped>
.book-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}

/* Media query for computer screens */
@media screen and (min-width: 768px) {
  .book-item {
    width: 50%; /* Display two items per row */
  }
}

/* Media query for mobile devices */
@media screen and (max-width: 767px) {
  .book-item {
    width: 100%; /* Display one item per row */
  }
}
</style>
