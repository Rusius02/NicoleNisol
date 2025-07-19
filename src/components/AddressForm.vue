<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="fullName"
      label="Nom complet"
      required
    ></v-text-field>

    <v-text-field
      v-model="addressLine1"
      label="Rue"
      required
    ></v-text-field>

    <v-text-field
      v-model="addressLine2"
      label="Numéro"
    ></v-text-field>

    <v-text-field
      v-model="city"
      label="Ville"
      required
    ></v-text-field>

    <v-text-field
      v-model="postalCode"
      label="Code postal"
      :error-messages="postalCodeError"
      @input="validatePostalCode"
      required
    ></v-text-field>

    <v-select
      v-model="country"
      :items="['BE', 'FR', 'US']"
      label="Pays"
      @change="validatePostalCode"
      required
    ></v-select>

    <div v-if="shippingCost !== null" class="my-2">
      <strong>Frais de port estimés :</strong> {{ (shippingCost / 100).toFixed(2) }} €
    </div>
    <div v-if="shippingCostError" class="error red--text">{{ shippingCostError }}</div>

    <v-text-field
      v-model="phoneNumber"
      label="Numéro de téléphone"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      label="Adresse e-mail"
      type="email"
      required
    ></v-text-field>
    <v-btn type="submit" color="primary" :disabled="postalCodeError !== ''">Continuer</v-btn>
    <v-btn @click="$emit('back')" color="primary">Retour</v-btn>
  </form>
</template>

  
  <script>
export default {
  data() {
    return {
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postalCode: '',
      country: 'BE',
      phoneNumber: '',
      email: '',
      postalCodeError: '',
      shippingCost: null,
      shippingCostError: ''
    };
  },
  watch: {
    postalCode: 'maybeEstimateShippingCost',
    country: 'maybeEstimateShippingCost'
  },
  methods: {
    validatePostalCode() {
      const zip = this.postalCode.trim();
      const country = this.country;
      let regex = null;

      switch (country) {
        case 'BE': // Belgique : 4 chiffres
          regex = /^[0-9]{4}$/;
          break;
        case 'FR': // France : 5 chiffres
          regex = /^[0-9]{5}$/;
          break;
        case 'US': // États-Unis : 5 chiffres ou 5-4
          regex = /^[0-9]{5}(?:-[0-9]{4})?$/;
          break;
        default:
          this.postalCodeError = '';
          return;
      }

      this.postalCodeError = regex.test(zip)
        ? ''
        : `Code postal invalide pour le pays ${country}`;
    },
    maybeEstimateShippingCost() {
      this.validatePostalCode();
      if (this.postalCodeError || !this.country || !this.postalCode) {
        this.shippingCost = null;
        return;
      }

      this.estimateShippingCost();
    },
    async estimateShippingCost() {
      try {
        const response = await fetch('/api/shipping/estimate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            country: this.country,
            postalCode: this.postalCode
          })
        });

        if (!response.ok) throw new Error('Erreur estimation');

        const data = await response.json();
        this.shippingCost = data.amount; // suppose que le back renvoie `{ amount: 500 }`
        this.shippingCostError = '';
      } catch (err) {
        this.shippingCost = null;
        this.shippingCostError = 'Impossible d\'estimer les frais de port';
      }
    },
    submit() {
      this.validatePostalCode();

      if (this.postalCodeError) return;

      this.$emit('next', {
        fullName: this.fullName,
        addressLine1: this.addressLine1,
        addressLine2: this.addressLine2,
        city: this.city,
        postalCode: this.postalCode,
        country: this.country,
        phoneNumber: this.phoneNumber,
        email: this.email
      });
    }
  }
};
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  