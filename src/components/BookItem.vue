<template>
  <div class="card-container">
    <v-card class="book-card" :elevation="elevation">
      <div class="card-content">
        <v-img class="book-image" :src="getFullImageUrl(coverImagePath)" alt="Book Cover"></v-img>
        <div class="card-details">
          <v-card-title class="card-title">{{ title }}</v-card-title>
          <v-card-text class="card-description">{{ description }}</v-card-text>
          <v-card-text class="card-price">{{ price }}€</v-card-text>
          <v-card-actions>
            <v-btn color="#6A5ACD" class="btn-buy" dark @click="addToBasket">
              <v-icon left>mdi-cart</v-icon> {{ $t('add_to_basket') }}
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
    coverImagePath: String,
    price: Number,
    priceIDFromStripe: String,
    elevation: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      baseUrl : process.env.VUE_APP_API_URL,
    }
  },
  methods: {
  addToBasket() {
    // Dispatch Vuex action to add the book to the basket
    this.$store.commit('addToBasket', {
      title: this.title,
      description: this.description,
      price: this.price,
      coverImagePath: this.coverImagePath,
      priceIDFromStripe: this.priceIDFromStripe
    });
  },
  getFullImageUrl(coverImagePath) {
    return `${this.baseUrl}${coverImagePath}`;
  },
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
.btn-buy:hover {
  color: white;
}
.card-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-title {
  font-family: 'Dancing Script', cursive;
}

.card-description {
  max-height: 100px; /* Adjust the max-height as needed */
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-price {
  margin-top: auto;
}

.v-card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}
</style>
