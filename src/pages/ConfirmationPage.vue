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
      <h1 class="text-h5 mb-4">✅ Paiement confirmé</h1>
      <p class="text-subtitle-1 mb-6">
        Merci pour votre commande ! Une confirmation vous a été envoyée par e-mail.
      </p>
      <v-btn color="primary" @click="$router.push('/')">Retour à l'accueil</v-btn>
    </v-card>
  </v-container>
</template>

  
  <script>
  export default {
    name: 'ConfirmationPage',
    mounted() {
      //const intentId = this.$route.query.payment_intent;
      const status = this.$route.query.redirect_status;
  
      if (status !== 'succeeded') {
        console.warn('Paiement non confirmé :', status);
      }
  
      // (optionnel) tu pourrais vérifier le PaymentIntent sur ton backend ici
    }
  };
  </script>
  