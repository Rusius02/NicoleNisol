<template>
    <div>
      <h1>Paiement</h1>
      <v-form ref="form">
        <v-text-field v-model="cardNumber" label="Numéro de carte" required></v-text-field>
        <v-text-field v-model="cardName" label="Titulaire de la carte" required></v-text-field>
        <v-text-field v-model="expiryDate" label="Date d'expiration" required></v-text-field>
        <v-text-field v-model="cvv" label="CVV" required></v-text-field>
      </v-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
      };
    },
    methods: {
      processPayment() {
        alert('Payment processed!');
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  