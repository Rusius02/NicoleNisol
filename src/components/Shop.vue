<!-- Shop.vue -->

<template>
   <div class="book-container">
    <!-- Display BookItems -->
    <BookItem v-for="(book, index) in books" :key="index" :title="book.title" :description="book.description" :coverImagePath="book.coverImagePath" :price="book.price" :priceIDFromStripe="book.stripeProductId" :isLeftAligned="index % 2 === 0" />
  </div>
  </template>
  
  <script>
  import BookItem from './BookItem.vue';
  import axios from 'axios';
  
  export default {
    name: 'ShopView',
    components: {
      BookItem,
    },
    mounted() {
      this.fetchBooks();
    },
    methods: {
      async fetchBooks() {
        try {
          const response = await axios.get(`${this.baseUrl}/api/Books/GetAll`);
          this.books = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
    },
    data() {
      return {
        books: [
         
        ],
        baseUrl : process.env.VUE_APP_API_URL,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to the Shop component */
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
  