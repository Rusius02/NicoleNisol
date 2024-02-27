<template>
    <div class="card-container">
        <v-card class="book-card" :elevation="elevation" style="font-family: 'Dancing Script', cursive;">
  <div class="card-content">
    <v-img class="book-image" :src="imageUrl" alt="Book Cover"></v-img>
    <div class="card-details">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ description }}</v-card-text>
      <v-card-text>{{ prix }}€</v-card-text>
      <v-card-actions>
        <v-btn color="primary">
          <v-icon left>mdi-cart</v-icon> Acheter
        </v-btn>
      </v-card-actions>
    </div>
  </div>
</v-card>
    </div>
  </template>
  
  <script>
  export default {
  props: {
    title: String,
    description: String,
    imageName: String,
    prix: Number,
    elevation: {
      type: [String, Number],
      default: 1
    }
  },
  computed: {
    imageUrl() {
      return require(`@/assets/img/${this.imageName}`);
    }
  }
};
  </script>
  
  <style scoped>
  .card-container {
    padding-top: 1%;
    width: 100%;
  display: flex;
  justify-content: center; /* Center the cards horizontally */
  align-items: center; /* Center the cards vertically */
}
  .book-card {
    width: 500px; /* Adjust card width as needed */
  }
  .card-content {
  display: flex;
}

.book-image {
  width: 150px; /* Adjust as needed */
  height: auto; /* Maintain aspect ratio */
}

.card-details {
  margin-left: 20px; /* Add space between image and details */
}
  </style>
  