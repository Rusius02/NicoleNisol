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
import { groupBasketItems } from '@/utils/basketHelper.js';
import authService from '@/services/authService';
import { paymentService } from '@/services/paymentService';

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
      publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      shippingInfos: null,
      clientSecret: null
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
      this.nextStep();
  },
    prevStep() {
      if (this.step > 1) this.step--;
    },
  },
  watch: {
    async step(newStep) {
      if (newStep === 3 && !this.clientSecret) {
        this.paymentError = null;
        try {
          const user = await authService.getCurrentUser();
          if (!user) throw new Error('Vous devez vous connecter avant de payer.');
          if (!this.publishableKey) throw new Error('La clé publique Stripe n’est pas configurée.');
          const expectedStripePrefix = import.meta.env.MODE === 'production' ? 'pk_live_' : 'pk_test_';
          if (!this.publishableKey.startsWith(expectedStripePrefix)) {
            throw new Error(`Le mode Stripe ne correspond pas au build ${import.meta.env.MODE}.`);
          }
          if (!this.shippingInfos) throw new Error('Veuillez renseigner une adresse de livraison.');

          this.stripe = await loadStripe(this.publishableKey);
          if (!this.stripe) throw new Error('Impossible de charger Stripe.');

          const books = this.groupedBooks.map(book => ({
            bookId: book.id,
            quantity: book.quantity
          }));
          const result = await paymentService.createPaymentIntent({
            books,
            shipping: this.shippingInfos
          });
          if (!result || !result.clientSecret) {
            throw new Error('Le service de paiement n’a pas retourné de secret client.');
          }

          this.clientSecret = result.clientSecret;
          this.elements = this.stripe.elements({ clientSecret: this.clientSecret });
        } catch (error) {
          this.paymentError = error.message || 'Impossible de préparer le paiement.';
        }
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
