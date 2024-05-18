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
            <v-btn @click="nextStep" color="primary">Suivant</v-btn>
          </v-stepper-content>
  
          <v-stepper-content step="3" v-if="step === 3">
            <PaymentPage @back="prevStep"></PaymentPage>
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
  import PaymentPage from '@/components/PaymentPage.vue';
  
  export default {
    name: 'CheckoutPage', 
    data() {
    return {
      step: 1
    };
  },
  methods: {
    nextStep() {
      if (this.step < 3) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    handlePayment() {
      // Implement payment logic here
      console.log("Proceeding to payment...");
    }
  },
  components: {
    BasketPage,
    AddressForm,
    PaymentPage
  }
};
</script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  