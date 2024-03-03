<template>
    <div class="card-container">
        <v-card class="book-card" :elevation="elevation">
  <div class="card-content">
    <v-img class="book-image" :src="imageUrl" alt="Book Cover"></v-img>
    <div class="card-details">
      <v-card-title style="font-family: 'Dancing Script', cursive;">{{ title }}</v-card-title>
      <v-card-text>{{ description }}</v-card-text>
      <v-card-text>{{ prix }}€</v-card-text>
      <v-card-actions>
        <v-btn color="#6A5ACD" class="btn-buy" dark>
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
}
  .book-card {
    width: 500px; /* Adjust card width as needed */
    height: 340px;
    padding: 3%;
  }
  .card-content {
  display: flex;
}

.book-image {
  width: 150px; /* Adjust as needed */
  height: 250px; /* Maintain aspect ratio */
}

.card-details {
  margin-left: 20px; /* Add space between image and details */
}
.btn-buy:hover{
color: white;
}
  </style>
  