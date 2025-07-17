<template>
  <v-container>
    <v-stepper  style="padding: 8px;" v-model="step">
      <v-stepper-header>
  <v-stepper-step :complete="step > 1" step="1" editable>
    <v-icon left class="mr-2">mdi-cart</v-icon>
    Panier
  </v-stepper-step>

  <v-divider></v-divider>

  <v-stepper-step :complete="step > 2" step="2" editable>
    <v-icon left class="mr-2">mdi-home-map-marker</v-icon>
    Adresse
  </v-stepper-step>

  <v-divider></v-divider>

  <v-stepper-step step="3">
    <v-icon left class="mr-2">mdi-credit-card-outline</v-icon>
    Paiement
  </v-stepper-step>
</v-stepper-header>
      <v-stepper-items>
        <!-- ÉTAPE 1 -->
        <v-stepper-content step="1" v-if="step === 1">
          <BasketPage @next="nextStep"></BasketPage>
          <v-btn @click="nextStep" color="primary">Suivant</v-btn>
        </v-stepper-content>

        <!-- ÉTAPE 2 -->
        <v-stepper-content step="2" v-if="step === 2">
          <AddressForm @next="handleAddressSubmit" @back="prevStep"></AddressForm>
        </v-stepper-content>

        <!-- ÉTAPE 3 -->
        <v-stepper-content step="3" v-if="step === 3">
          <StripeCardForm
            v-if="step === 3 && stripe && elements && clientSecret"
            :stripe="stripe"
            :elements="elements"
            :clientSecret="clientSecret"
          />
          <v-btn @click="prevStep" color="primary">Retour</v-btn>
          <v-btn @click="handlePayment" color="primary">Payez</v-btn>
          <div v-if="paymentError" class="error red--text mt-2">{{ paymentError }}</div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import BasketPage from '@/components/BasketPage.vue';
import AddressForm from '@/components/AddressForm.vue';
import StripeCardForm from '@/components/StripeCardForm.vue';
import { loadStripe } from '@stripe/stripe-js';
import { mapState } from 'vuex';
import { groupBasketItems, calculateTotalAmount } from '@/utils/basketHelper.js';

export default {
  name: 'CheckoutPage',
  components: { BasketPage, AddressForm, StripeCardForm },
  data() {
    return {
      step: 1,
      stripe: null,
      elements: null,
      cardElement: null,
      paymentError: null,
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      shippingInfos: null
    };
  },
  computed: {
    ...mapState({
      basketItems: state => state.basket.items,
    }),
    groupedBooks() {
      return groupBasketItems(this.basketItems);
    },
    totalPrice() {
      return this.groupedBooks.reduce((total, item) => total + item.totalPrice, 0);
    }
  },
  methods: {
    nextStep() {
      if (this.step < 3) this.step++;
    },
    handleAddressSubmit(data) {
    this.shippingInfos = data;
     console.log("Réception des infos :", data);
    this.nextStep();
  },
    prevStep() {
      if (this.step > 1) this.step--;
    },
  },
  watch: {
    async step(newStep) {
      if (newStep === 3 && !this.clientSecret) {
        this.stripe = await loadStripe(this.publishableKey);
        const token = localStorage.getItem('authToken');
        const userConnected = JSON.parse(localStorage.getItem('currentUser'));
        if (!token || !userConnected) {
          this.paymentError = "Utilisateur non connecté.";
          return;
        }
        const booksDto = this.groupedBooks.map(book => ({
          stripePriceId: book.priceIDFromStripe,
          quantity: book.quantity
        }));
        const amount = calculateTotalAmount(this.basketItems); // en centimes
       
        const response = await fetch('https://localhost:5001/api/Payments/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userConnected.id,
            books: booksDto,
            currency: 'eur',
            amount: amount,
            ...this.shippingInfos
          })
        });

        const data = await response.json();
        this.clientSecret = data.clientSecret;

        this.elements = this.stripe.elements({ clientSecret: this.clientSecret });
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
