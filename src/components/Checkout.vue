<template>
  <v-container class="checkout-page page-shell">
    <header class="page-heading checkout-heading">
      <p class="page-kicker">{{ $t('basket') }}</p>
      <h1 class="page-title">Finaliser votre commande</h1>
      <p class="page-intro">Quelques étapes simples pour recevoir vos livres.</p>
    </header>
    <v-stepper
      v-model="step"
      class="checkout-stepper"
      :items="stepItems"
      hide-actions
    >
      <template #item="{ value }">
        <div v-if="value === 1" class="step-content">
          <BasketPage />
          <v-btn class="checkout-action" color="primary" @click="nextStep">Suivant</v-btn>
        </div>

        <div v-else-if="value === 2" class="step-content">
          <AddressForm @next="handleAddressSubmit" @back="prevStep" />
        </div>

        <div v-else class="step-content">
          <StripeCardForm
            v-if="stripe && elements && clientSecret"
            :stripe="stripe"
            :elements="elements"
            :client-secret="clientSecret"
          />
          <v-btn class="checkout-action checkout-action--secondary" color="primary" variant="text" @click="prevStep">
            Retour
          </v-btn>
          <div v-if="paymentError" class="error mt-2" role="alert">{{ paymentError }}</div>
        </div>
      </template>
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
      stepItems: [
        { title: 'Panier', value: 1, props: { editable: true } },
        { title: 'Adresse', value: 2, props: { editable: true } },
        { title: 'Paiement', value: 3 }
      ],
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
.checkout-page {
  min-height: 70vh;
}

.checkout-heading {
  margin-bottom: 2rem;
}

.checkout-stepper {
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.step-content {
  padding: clamp(0.75rem, 3vw, 2rem);
}

.checkout-action {
  min-height: 46px;
  margin: 0.5rem;
  padding-inline: 1.3rem;
  border-radius: 999px;
}

.checkout-action--secondary {
  color: var(--color-plum) !important;
}

.error {
  color: #a64050;
}

@media (max-width: 480px) {
  .checkout-stepper :deep(.v-stepper-header) {
    padding-inline: 0.35rem;
  }

  .checkout-stepper :deep(.v-stepper-item) {
    min-width: 0;
    padding: 0.5rem 0.3rem;
  }

  .checkout-stepper :deep(.v-stepper-item__title) {
    font-size: 0.68rem;
    white-space: nowrap;
  }

  .checkout-stepper :deep(.v-divider) {
    margin-inline: 0.2rem;
  }
}
</style>
