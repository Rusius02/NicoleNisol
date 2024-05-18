<template>
    <div>
      <h1>Vérifiez vos articles</h1>
      <v-list>
        <v-list-item v-for="(item, title) in uniqueItems" :key="title">
          <v-list-item-content>
            <v-list-item-title>
              {{ title }} -> {{ item.count }} times ({{ item.totalPrice }}€)
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
              totalPrice: 0
            };
          }
          itemMap[item.title].count++;
          itemMap[item.title].totalPrice += item.prix;
        });
        return itemMap;
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
  /* Add your styles here */
  </style>
  