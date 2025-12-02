<template>
  <v-container fluid class="d-flex justify-center align-center fill-height">
    
    <v-card class="contact-card card-postcard" elevation="10">
      
      <div class="postcard-header">
        <v-card-title class="headline font-weight-regular justify-center text-secondary text-center">
          💌 Écrivez-moi
        </v-card-title>
        <v-card-subtitle class="text-center pb-4 text-primary">
          Formulaire de contact
        </v-card-subtitle>
      </div>

      <v-card-text class="pt-0">
        <v-divider class="my-4 divider-style"></v-divider>

        <v-form @submit.prevent="participate" ref="form">
          
          <v-text-field
            v-model="name"
            label="Nom complet"
            outlined
            dense
            required
            color="deep-purple accent-4"
            prepend-inner-icon="mdi-account"
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Adresse Email (Pour vous répondre)"
            outlined
            dense
            required
            type="email"
            color="deep-purple accent-4"
            prepend-inner-icon="mdi-email"
            class="mb-3"
          ></v-text-field>

          <v-textarea
            v-model="message"
            label="Votre message..."
            outlined
            rows="5"
            required
            color="deep-purple accent-4"
            prepend-inner-icon="mdi-pencil-box-multiple"
            class="mb-6"
          ></v-textarea>

          <v-btn
            type="submit"
            block
            large
            color="deep-purple accent-4"
            class="white--text font-weight-bold elevation-4 postcard-button"
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
/* Conteneur principal de la carte */
.contact-card {
  max-width: 600px;
  width: 90%;
  /* Conserver le flou pour l'intégration au background */
  backdrop-filter: blur(8px); 
  /* Utiliser un blanc cassé pour l'effet "papier" */
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  /* Ombre plus prononcée pour l'effet 3D de la carte */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.2);
}

/* Style Carte Postale */
.card-postcard {
  /* Bordure dentelée ou stylisée (simple ici car CSS limité dans les frameworks) */
  /* Nous utilisons une double bordure ou un décalage pour un effet "cadre" */
  border: 3px solid #E6E6FA; /* Lavande très clair */
  box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.4); /* Bordure intérieure blanche transparente */
}

/* Style de l'en-tête */
.postcard-header {
  border-bottom: 2px dashed #9370DB; /* Trait violet pointillé pour séparer l'adresse/message */
  padding-bottom: 10px;
  margin-bottom: 10px;
}

/* Ligne de séparation dans le corps */
.divider-style {
  background-color: #9370DB !important; /* Couleur Lavande */
  border-color: #9370DB !important;
  opacity: 0.5;
}

/* Titre stylisé */
.text-primary {
  color: #7B68EE !important; /* Couleur Violet foncé */
}

.text-secondary {
    color: #483D8B !important; /* Couleur Violet très foncé */
}

/* Bouton stylisé */
.postcard-button {
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Améliorations sur les champs de texte pour le look épuré */
.v-text-field--outlined >>> fieldset,
.v-textarea--outlined >>> fieldset {
  border-color: #DDA0DD !important; /* Bordures des champs plus douces (Prune) */
}
</style>