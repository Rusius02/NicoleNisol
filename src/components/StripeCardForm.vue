<!-- StripeCardForm.vue -->
<template>
    <form @submit.prevent="submitPayment">
      <div id="payment-element" class="my-4" />
      <v-btn :loading="loading" color="primary" type="submit">Payer</v-btn>
      <div v-if="errorMessage" class="error red--text mt-2">{{ errorMessage }}</div>
    </form>
  </template>
  
  <script>
  export default {
    name: 'StripePaymentElement',
    props: {
      stripe: Object,
      elements: Object,
      clientSecret: String
    },
    data() {
      return {
        errorMessage: null,
        loading: false
      };
    },
    mounted() {
      if (this.elements) {
        const paymentElement = this.elements.create('payment');
        paymentElement.mount('#payment-element');
      }
    },
    methods: {
      async submitPayment() {
        this.loading = true;
        const { error } = await this.stripe.confirmPayment({
          elements: this.elements,
          confirmParams: {
            return_url: window.location.origin + '/confirmation'
          }
        });
        this.loading = false;
  
        if (error) {
          this.errorMessage = error.message;
        }
      }
    }
  };
  </script>
  