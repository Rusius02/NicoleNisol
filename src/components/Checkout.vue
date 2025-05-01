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
        <div id="card-element"></div>
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
  mounted() {
    this.initStripeElements();
  },
  methods: {
    nextStep() {
      if (this.step < 2) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    async initStripeElements() {
      const stripe = await loadStripe(this.publishableKey);
      const elements = stripe.elements();
      const card = elements.create('card');
      card.mount('#card-element');
      this.cardElement = card;
    },
    calculateTotalAmount() {
      return this.basketItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0) * 100; // Stripe attend des centimes
    },
    async handlePayment() {
    try {
      const token = localStorage.getItem('authToken'); 
      const userConnected = localStorage.getItem('currentUser');

      if (!token) {
        console.error("Aucun token trouvé. L'utilisateur n'est peut-être pas connecté.");
        return;
      }
      // Appel à ton backend pour créer le PaymentIntent
      const response = await fetch('https://localhost:5001/api/Payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userConnected.id,
          amount: this.calculateTotalAmount(), // Montant en CENTIMES (ex: 200 = 2€)
          currency: 'eur',
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur backend: ' + response.statusText);
      }

      const data = await response.json();

      const stripe = await loadStripe(this.publishableKey);

      // Demande à Stripe de confirmer le paiement avec le client secret
      const { error } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: this.cardElement, // Doit être défini via Stripe Elements (voir étape suivante)
          billing_details: {
            name: 'Nom de l’utilisateur', // optionnel
          },
        },
      });

      if (error) {
        console.error('Erreur lors de la confirmation du paiement:', error);
      } else {
        console.log('Paiement réussi!');
        // redirection ou affichage de confirmation ici
      }
    } catch (err) {
      console.error('Erreur lors du traitement du paiement:', err);
    }
  }

  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
