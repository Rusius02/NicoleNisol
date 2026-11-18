<template>
  <v-container fluid class="contact-page page-shell d-flex justify-center align-center">
    
    <v-card class="contact-card card-postcard" elevation="0">
      
      <div class="postcard-header">
        <p class="page-kicker">{{ $t('contact') }}</p>
        <v-card-title class="contact-title justify-center text-center">
          <v-icon class="mr-2">mdi-email-heart-outline</v-icon>
          Écrivez-moi
        </v-card-title>
        <v-card-subtitle class="text-center pb-4 contact-subtitle">
          Formulaire de contact
        </v-card-subtitle>
      </div>

      <v-card-text class="pt-0">
        <v-divider class="my-4 divider-style"></v-divider>

        <v-form @submit.prevent="participate" ref="form">
          
          <v-text-field
            v-model="name"
            label="Nom complet"
            variant="outlined"
            density="comfortable"
            required
            color="primary"
            prepend-inner-icon="mdi-account"
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Adresse Email (Pour vous répondre)"
            variant="outlined"
            density="comfortable"
            required
            type="email"
            color="primary"
            prepend-inner-icon="mdi-email"
            class="mb-3"
          ></v-text-field>

          <v-textarea
            v-model="message"
            label="Votre message..."
            variant="outlined"
            rows="5"
            required
            color="primary"
            prepend-inner-icon="mdi-pencil-box-multiple"
            class="mb-6"
          ></v-textarea>

          <v-btn
            type="submit"
            block
            large
            color="primary"
            class="postcard-button"
            :disabled="!name || !email || !message"
          >
            <v-icon left>mdi-send</v-icon>
            Envoyer la Carte Postale
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '', // Ajout du champ email
      message: '',
    };
  },
  methods: {
    // La méthode utilise désormais this.name, this.email et this.message
    participate() {
      if (this.$refs.form.validate()) {
        const subject = `Contact site web par ${this.name}`;
        // Inclure l'email dans le corps du message pour la réponse
        const body = `De: ${this.name} (${this.email})\n\nMessage:\n${this.message}`;
        
        const mailToLink = `mailto:nicole.nisol1962@hotmail.be?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
    
        // Ouvre le client mail
        window.location.href = mailToLink;

        // Optionnel : Réinitialiser le formulaire après l'envoi
        this.$refs.form.reset();
        this.name = '';
        this.email = '';
        this.message = '';
      }
    },
  },
};
</script>

<style scoped>
.contact-page {
min-height: 70vh;
}

.contact-card {
  max-width: 600px;
  width: 90%;
padding: clamp(1.25rem, 4vw, 2.5rem);
border: 1px solid var(--color-border);
border-radius: var(--radius-card);
background: var(--color-surface);
box-shadow: var(--shadow-soft);
}

.card-postcard {
border-top: 4px solid var(--color-lavender-deep);
}

.postcard-header {
margin-bottom: 1rem;
padding-bottom: 0.75rem;
border-bottom: 1px solid var(--color-border);
}

.postcard-header .page-kicker {
margin-top: 0.5rem;
text-align: center;
}

.contact-title {
color: var(--color-plum-dark);
font-family: var(--font-display);
font-size: clamp(2.2rem, 5vw, 3rem);
font-weight: 600;
}

.contact-subtitle {
color: var(--color-muted);
}

.postcard-button {
min-height: 50px;
border-radius: 999px;
font-weight: 700;
}

:deep(.v-field--variant-outlined .v-field__outline) {
color: var(--color-lavender-deep);
}
</style>