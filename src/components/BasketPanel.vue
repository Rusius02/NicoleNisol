<template>
    <v-card>
      <v-card-title>Panier</v-card-title>
      <v-list>
        <v-list-item v-for="(item, index) in basketItems" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.prix }}€ </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="removeItem(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    computed: {
    ...mapState({
      basketItems: state => state.basket.items // Map basket/items state to basketItems computed property
    })
  },
  methods: {
    ...mapMutations({
      removeFromBasketMutation: 'removeFromBasket' // Map removeFromBasket mutation to removeFromBasketMutation method
    }),
    removeItem(index) {
      // Call removeFromBasket mutation to remove item from basket
      this.removeFromBasketMutation(index);
    }
  }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  