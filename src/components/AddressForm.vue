<template>
    <div>
      <h1>Information de livraison</h1>
      <v-form ref="form">
        <v-text-field v-model="name" label="Nom" required></v-text-field>
        <v-text-field v-model="address" label="Adresse" required></v-text-field>
        <v-text-field v-model="city" label="Ville" required></v-text-field>
        <v-text-field v-model="zipCode" label="Code postal" required></v-text-field>
        <v-text-field v-model="country" label="Pays" required></v-text-field>
      </v-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        address: '',
        city: '',
        zipCode: '',
        country: ''
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  