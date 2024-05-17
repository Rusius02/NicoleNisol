<template>
    <div>
      <h1>Address Information</h1>
      <v-form ref="form">
        <v-text-field v-model="name" label="Name" required></v-text-field>
        <v-text-field v-model="address" label="Address" required></v-text-field>
        <v-text-field v-model="city" label="City" required></v-text-field>
        <v-text-field v-model="zipCode" label="ZIP Code" required></v-text-field>
        <v-text-field v-model="country" label="Country" required></v-text-field>
      </v-form>
      <v-btn color="primary" @click="$emit('back')">Back</v-btn>
      <v-btn color="primary" @click="$emit('next')">Payer</v-btn>
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
  