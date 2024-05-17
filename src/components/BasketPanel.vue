<template>
    <v-card>
      <v-card-title>Panier</v-card-title>
      <v-list>
        <v-list-item v-for="(item, index) in uniqueItems" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }} ({{ item.count }} fois)
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="removeItem(item.title)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-card-actions>
      <v-btn color="primary" @click="validateBasket">Valider mon panier</v-btn>
    </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    computed: {
      ...mapState({
        basketItems: state => state.basket.items // Map basket/items state to basketItems computed property
      }),
      uniqueItems() {
        // Create a map to count occurrences of each item
        const itemMap = {};
        this.basketItems.forEach(item => {
          itemMap[item.title] = (itemMap[item.title] || 0) + 1;
        });
  
        // Convert the map into an array of objects with title and count properties
        return Object.keys(itemMap).map(title => ({
          title,
          count: itemMap[title]
        }));
      }
    },
    methods: {
      ...mapMutations({
        removeFromBasketMutation: 'removeFromBasket' // Map removeFromBasket mutation to removeFromBasketMutation method
      }),
      removeItem(title) {
        // Find the index of the first occurrence of the item with the given title
        const index = this.basketItems.findIndex(item => item.title === title);
        if (index !== -1) {
          // Call removeFromBasket mutation to remove item from basket
          this.removeFromBasketMutation(index);
        }
      },
      validateBasket() {
      this.$router.push('/checkout'); // Navigate to BasketPage
    }
    }
  };
  </script>
  