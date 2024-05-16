<template>
    <v-card>
      <v-card-title>Panier</v-card-title>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.price }}</v-list-item-subtitle>
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
  export default {
    props: {
      items: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      removeItem(index) {
        this.$emit('remove', index);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  