<template>
    <v-container class="text-center">
      <h1 class="text-h4">✅ Paiement confirmé</h1>
      <p class="text-subtitle-1 mt-2">
        Merci pour votre commande ! Une confirmation vous a été envoyée par e-mail.
      </p>
      <v-btn color="primary" @click="$router.push('/')">Retour à l'accueil</v-btn>
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
  