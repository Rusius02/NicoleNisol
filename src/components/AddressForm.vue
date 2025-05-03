<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="first_name"
      label="Prénom"
      required
    ></v-text-field>
    <v-text-field
      v-model="last_name"
      label="Nom"
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

    <v-btn type="submit" color="primary" :disabled="postalCodeError !== ''">Continuer</v-btn>
    <v-btn @click="$emit('back')" color="primary">Retour</v-btn>
  </form>
</template>
  
  <script>
export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      postalCode: '',
      country: 'BE',
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
        name: this.name,
        postalCode: this.postalCode,
        country: this.country,
      });
    }
  }
};
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  