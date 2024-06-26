<template>
  <v-container>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Panier</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Adresse</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Paiement</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1" v-if="step === 1">
          <BasketPage @next="nextStep"></BasketPage>
          <v-btn @click="nextStep" color="primary">Suivant</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2" v-if="step === 2">
          <AddressForm @next="nextStep" @back="prevStep"></AddressForm>
          <v-btn @click="prevStep" color="primary">Retour</v-btn>
          <v-btn @click="handlePayment" color="primary">Payez</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import BasketPage from '@/components/BasketPage.vue';
import AddressForm from '@/components/AddressForm.vue';
import { loadStripe } from '@stripe/stripe-js';
import { mapState } from 'vuex';

export default {
  name: 'CheckoutPage',
  components: {
    BasketPage,
    AddressForm,
  },
  data() {
    return {
      step: 1,
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      successURL: 'http://localhost:8080/',
      cancelURL: 'http://localhost:8080/',
    };
  },
  computed: {
    ...mapState({
      basketItems: state => state.basket.items,
    }),
    lineItems() {
      console.log('basketItems:', this.basketItems);
    const itemMap = this.basketItems.reduce((acc, item) => {
      if (acc[item.title]) {
        acc[item.title].quantity += 1;
      } else {
        acc[item.title] = {
          price: item.priceIDFromStripe, // Ensure each item has a priceID from Stripe
          quantity: 1,
        };
      }
      return acc;
    }, {});

    return Object.values(itemMap);
  },
  },
  methods: {
    nextStep() {
      if (this.step < 2) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    async handlePayment() {
      const stripe = await loadStripe(this.publishableKey);
      const { error } = await stripe.redirectToCheckout({
        lineItems: this.lineItems,
        mode: 'payment',
        successUrl: this.successURL,
        cancelUrl: this.cancelURL,
      });

      if (error) {
        console.error('Error during Stripe checkout:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
