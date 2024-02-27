<!-- BookDetails.vue -->

<template>
    <div class="book-details">
      <div class="image-container">
        <img :src="imageUrl" alt="Book Image" class="book-image">
      </div>
      <div class="description">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <p>{{ prix }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookDetails',
    props: {
      title: String,
      description: String,
      imageName: String,
      prix: Number,
    },
    computed: {
      imageUrl() {
        // Construct the image URL using require
        return require(`@/assets/img/${this.imageName}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to the BookItem component */
  .book-item {
    display: flex;
    margin-bottom: 20px;
  }
  
  .image-container {
    flex: 1;
    margin-right: 20px;
  }
  
  .book-image {
    max-width: 100%;
  }
  
  .description {
    flex: 2;
  }
  </style>
  