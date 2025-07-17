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
      postalCodeError: ''
    };
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
  