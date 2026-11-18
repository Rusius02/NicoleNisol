<template>
  <form class="address-form" @submit.prevent="submit">
    <v-text-field
      v-model="fullName"
      label="Nom complet"
      variant="outlined"
      density="comfortable"
      required
    ></v-text-field>

    <v-text-field
      v-model="addressLine1"
      label="Rue"
      variant="outlined"
      density="comfortable"
      required
    ></v-text-field>

    <v-text-field
      v-model="addressLine2"
      label="Numéro"
      variant="outlined"
      density="comfortable"
    ></v-text-field>

    <v-text-field
      v-model="city"
      label="Ville"
      variant="outlined"
      density="comfortable"
      required
    ></v-text-field>

    <v-text-field
      v-model="postalCode"
      label="Code postal"
      variant="outlined"
      density="comfortable"
      :error-messages="postalCodeError"
      @input="validatePostalCode"
      required
    ></v-text-field>

    <v-select
      v-model="country"
      :items="['BE', 'FR', 'US']"
      label="Pays"
      variant="outlined"
      density="comfortable"
      @change="validatePostalCode"
      required
    ></v-select>

    <div v-if="shippingCost !== null" class="shipping-summary">
      <strong>Frais de port estimés :</strong> {{ (shippingCost / 100).toFixed(2) }} €
    </div>
    <div v-if="shippingCostError" class="error shipping-error" role="alert">{{ shippingCostError }}</div>

    <v-text-field
      v-model="phoneNumber"
      label="Numéro de téléphone"
      variant="outlined"
      density="comfortable"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      label="Adresse e-mail"
      type="email"
      variant="outlined"
      density="comfortable"
      required
    ></v-text-field>
    <div class="address-actions">
      <v-btn type="button" class="checkout-action checkout-action--secondary" variant="text" @click="$emit('back')">Retour</v-btn>
      <v-btn type="submit" class="checkout-action" color="primary" :disabled="postalCodeError !== ''">Continuer</v-btn>
    </div>
  </form>
</template>

  
  <script>
import { paymentService } from '@/services/paymentService';

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
      shippingCostError: '',
      shippingRequestId: 0
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
        this.shippingRequestId += 1;
        this.shippingCost = null;
        return;
      }

      this.estimateShippingCost();
    },
    async estimateShippingCost() {
      const requestId = ++this.shippingRequestId;
      try {
        const data = await paymentService.estimateShipping({
          country: this.country,
          postalCode: this.postalCode
        });
        if (requestId !== this.shippingRequestId) return;
        this.shippingCost = data.amount;
        this.shippingCostError = '';
      } catch (err) {
        if (requestId !== this.shippingRequestId) return;
        this.shippingCost = null;
        this.shippingCostError = err.message || 'Impossible d\'estimer les frais de port';
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
.address-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.25rem 1rem;
  max-width: 760px;
  margin: 1rem auto;
}

.shipping-summary {
  grid-column: 1 / -1;
  margin: 0.25rem 0 1rem;
  padding: 1rem 1.2rem;
  border-radius: 14px;
  background: var(--color-lavender);
  color: var(--color-plum-dark);
}

.shipping-error {
  grid-column: 1 / -1;
  margin-bottom: 0.75rem;
  color: #a64050;
}

.address-actions {
  display: flex;
  grid-column: 1 / -1;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

@media (max-width: 600px) {
  .address-form {
    grid-template-columns: 1fr;
  }

  .shipping-summary,
  .shipping-error,
  .address-actions {
    grid-column: auto;
  }

  .address-actions {
    justify-content: stretch;
    flex-direction: column-reverse;
  }
}
  </style>
  