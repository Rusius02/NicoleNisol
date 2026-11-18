<!-- StripeCardForm.vue -->
<template>
    <form class="stripe-payment-form" @submit.prevent="submitPayment">
      <div id="payment-element" class="payment-element my-4" />
      <v-btn class="checkout-action" :loading="loading" color="primary" type="submit">Payer</v-btn>
      <div v-if="errorMessage" class="error payment-error mt-2" role="alert">{{ errorMessage }}</div>
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

<style scoped>
.stripe-payment-form {
  max-width: 760px;
  margin: 1rem auto;
}

.payment-element {
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: #fff;
}

.payment-error {
  color: #a64050;
}
</style>
  