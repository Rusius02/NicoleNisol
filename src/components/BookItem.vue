<template>
  <div class="card-container">
    <v-card class="book-card" :elevation="elevation">
      <div class="card-content">
        <!-- Remplacement de getFullImageUrl par la prop directe, ou une image par défaut si vide -->
        <v-img 
          class="book-image" 
          :src="coverImagePath || defaultFallbackImage" 
          alt="Book Cover"
        ></v-img>
        
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
  name: 'BookItem',
  props: {
    title: String,
    description: String,
    coverImagePath: String, 
    linkBuy: String,
    price: Number,
    priceIDFromStripe: String,
    elevation: {
      type: [String, Number],
      default: 1
    }
  },

  data() {
    return {
      // Une image de couverture générique si un livre n'a pas encore d'image assignée
      defaultFallbackImage: 'https://placehold.co/150x250/6A5ACD/white?text=Nicole+Nisol'
    };
  },

  methods: {
    addToBasket() {
      if (this.linkBuy) {
        window.open(this.linkBuy, '_blank');
      } else {
        console.error("Le lien d'achat (linkBuy) n'est pas défini.");
      }
    }
  }
};
</script>

<style scoped>
.card-container {
  padding-top: 1%;
}
.book-card {
  width: 500px;
  height: 340px;
  padding: 3%;
}
.card-content {
  display: flex;
}
.book-image {
  width: 150px;
  height: 250px;
}
.card-details {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.btn-buy:hover {
  color: white;
}
.card-title {
  font-family: 'Dancing Script', cursive;
}
.card-description {
  max-height: 100px;
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