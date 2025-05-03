<template>
    <div>
      <h1>Vérifiez vos articles</h1>
      <v-container>
      <v-row>
        <v-col v-for="(item, title) in uniqueItems" :key="title" cols="12" md="6" lg="4">
          <v-card class="book-card" :elevation="1">
            <div class="card-content">
              <v-img class="book-image" :src="item.imageUrl" alt="Book Cover"></v-img>
              <div class="card-details">
                <v-card-title style="font-family: 'Dancing Script', cursive;">
                  {{ title }} ({{ item.count }}x)
                </v-card-title>
                <v-card-text>
                  {{ item.description }}
                </v-card-text>
                <v-card-text>
                  Total: {{ item.totalPrice }}€
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <div class="total-price">
      <v-card>
        <v-card-title>Total Price: {{ totalPrice }}€</v-card-title>
      </v-card>
    </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import { groupBasketItems } from '@/utils/basketHelper.js';
  
  export default {
    methods: {
      goToAddress() {
        this.$router.push('/address');
      },
    },
    computed: {
      ...mapState({
        basketItems: state => state.basket.items 
      }),
      uniqueItems() {
        const grouped = groupBasketItems(this.basketItems);
        return grouped.reduce((map, item) => {
          map[item.title] = {
            count: item.quantity,
            totalPrice: item.totalPrice,
            imageUrl: `${this.baseUrl}${item.coverImagePath}`,
            description: item.description
          };
          return map;
        }, {});
      },
      totalPrice() {
        return Object.values(this.uniqueItems)
          .reduce((sum, item) => sum + item.totalPrice, 0);
      }
    },
    data() {
    return {
        baseUrl: 'https://localhost:5001', 
      }
    },
  };
  </script>
  
<style scoped>
.card-container {
  padding-top: 1%;
}
.book-card {
  width: 100%;
  margin-bottom: 20px;
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
.total-price {
  margin-top: 20px;
  text-align: right;
}
</style>
  