<template>
  <v-container
    class="d-flex align-center justify-center"
    fluid
    style="min-height: 100vh"
  >
    <v-card
      class="pa-6 text-center"
      max-width="500"
      elevation="10"
      style="background-color: white"
    >
      <h1 v-if="paymentSucceeded" class="text-h5 mb-4">✅ Paiement confirmé</h1>
      <h1 v-else class="text-h5 mb-4">Paiement non confirmé</h1>
      <p v-if="paymentSucceeded" class="text-subtitle-1 mb-6">
        Merci pour votre commande.
      </p>
      <p v-else class="text-subtitle-1 mb-6">
        Le paiement n’a pas pu être confirmé. Vérifiez votre commande ou contactez-nous.
      </p>
      <v-btn color="primary" @click="$router.push('/')">Retour à l'accueil</v-btn>
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
  