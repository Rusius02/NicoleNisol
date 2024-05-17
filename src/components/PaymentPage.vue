<template>
    <div>
      <h1>Payment</h1>
      <v-form ref="form">
        <v-text-field v-model="cardNumber" label="Card Number" required></v-text-field>
        <v-text-field v-model="cardName" label="Name on Card" required></v-text-field>
        <v-text-field v-model="expiryDate" label="Expiry Date" required></v-text-field>
        <v-text-field v-model="cvv" label="CVV" required></v-text-field>
      </v-form>
      <v-btn color="primary" @click="$emit('back')">Back</v-btn>
      <v-btn color="primary" @click="processPayment">Payer</v-btn>
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
        // Handle payment processing here
        alert('Payment processed!');
        this.$router.push('/'); // Redirect to home or another page after payment
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  