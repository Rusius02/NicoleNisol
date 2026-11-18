<template>
  <v-container
    class="confirmation-page page-shell d-flex align-center justify-center"
    fluid
  >
    <v-card
      class="confirmation-card pa-6 text-center"
      max-width="500"
      elevation="0"
    >
      <div class="confirmation-icon" :class="{ 'confirmation-icon--success': paymentSucceeded }">
        <v-icon size="34">{{ paymentSucceeded ? 'mdi-check' : 'mdi-alert-outline' }}</v-icon>
      </div>
      <h1 v-if="paymentSucceeded" class="confirmation-title mb-4">Paiement confirmé</h1>
      <h1 v-else class="confirmation-title mb-4">Paiement non confirmé</h1>
      <p v-if="paymentSucceeded" class="confirmation-copy mb-6">
        Merci pour votre commande.
      </p>
      <p v-else class="confirmation-copy mb-6">
        Le paiement n’a pas pu être confirmé. Vérifiez votre commande ou contactez-nous.
      </p>
      <v-btn class="checkout-action" color="primary" @click="$router.push('/')">Retour à l'accueil</v-btn>
    </v-card>
  </v-container>
</template>

  
  <script>
  export default {
    name: 'ConfirmationPage',
    data() {
      return {
        paymentSucceeded: false,
      };
    },
    mounted() {
      const status = this.$route.query.redirect_status;
      this.paymentSucceeded = status === 'succeeded';
    }
  };
  </script>

<style scoped>
.confirmation-page {
  min-height: 65vh;
}

.confirmation-card {
  width: 100%;
  padding: clamp(2rem, 6vw, 3.5rem) !important;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.confirmation-icon {
  display: grid;
  width: 68px;
  height: 68px;
  margin: 0 auto 1.2rem;
  place-items: center;
  border-radius: 50%;
  background: var(--color-lavender);
  color: var(--color-plum);
}

.confirmation-icon--success {
  background: #e8eee1;
  color: #536b49;
}

.confirmation-title {
  color: var(--color-plum-dark);
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 600;
}

.confirmation-copy {
  color: var(--color-muted);
  line-height: 1.7;
}
</style>
  