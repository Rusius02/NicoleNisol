<template>
    <v-card>
      <v-card-title>Panier</v-card-title>
      <v-list>
        <v-list-item style="" v-for="(item, title) in uniqueItems" :key="title">

        <v-list-item-content>
                  <!-- Avatar avec l'image du livre -->
        <v-list-item-avatar>
          <v-img style="max-height: 250px;" :src="item.imageUrl" alt="Image du livre" />
        </v-list-item-avatar>
          <v-list-item-title>
            {{ title }} ({{ item.count }} fois)
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
  import { groupBasketItems } from '@/utils/basketHelper.js';
  
  export default {
    data() {
    return {
        baseUrl: 'https://localhost:5001', 
      }
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
    },
    methods: {
      ...mapMutations({
        removeFromBasketMutation: 'removeFromBasket' 
      }),
      removeItem(title) {
        const index = this.basketItems.findIndex(item => item.title === title);
        if (index !== -1) {
          this.removeFromBasketMutation(index);
        }
      },
      validateBasket() {
      this.$router.push('/checkout'); 
    }
    }
  };
  </script>
  