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
  
  export default {
    computed: {
      ...mapState({
        basketItems: state => state.basket.items // Map basket/items state to basketItems computed property
      }),
      uniqueItems() {
      const itemMap = {};
      this.basketItems.forEach(item => {
        if (!itemMap[item.title]) {
          itemMap[item.title] = {
            count: 0,
            totalPrice: 0,
            imageUrl: require(`@/assets/img/${item.imageName}`),
            description: item.description,
            prix: item.prix
          };
        }
        itemMap[item.title].count++;
        itemMap[item.title].totalPrice += item.prix;
      });
      return itemMap;
    },
    totalPrice() {
      return this.basketItems.reduce((total, item) => total += item.prix, 0);
    }
    },
    methods: {
      goToAddress() {
        this.$router.push('/address');
      }
    }
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
  