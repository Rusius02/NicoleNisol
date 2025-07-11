<template>
  <v-container fluid class="d-flex justify-center align-center fill-height">
    <v-card class="contact-card" elevation="10">
      <v-card-title class="headline font-weight-bold justify-center text-primary">
        Formulaire de contact
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="participate(name, message)" ref="form">
          <v-text-field
            v-model="name"
            label="Nom"
            outlined
            dense
            color="deep-purple accent-4"
            class="mb-4"
          ></v-text-field>

          <v-textarea
            v-model="message"
            label="Message"
            outlined
            rows="4"
            color="deep-purple accent-4"
            class="mb-4"
          ></v-textarea>

          <v-btn
            type="submit"
            block
            color="deep-purple accent-4"
            class="white--text font-weight-bold"
          >
            Envoyer
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
      email: '',
      message: '',
    };
  },
  methods: {
    submitForm() {
      // Action à effectuer à la soumission
      alert('Message envoyé !');
    },
    participate(name, message) {
        const subject = `Contact via site web: ${name}`;
        const body = message;
        const mailToLink = `mailto:nicole.nisol1962@hotmail.be?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
  
        // Ouvre le client mail avec les informations pré-remplies
        window.location.href = mailToLink;
      },
  },
};
</script>

<style scoped>
.contact-card {
  max-width: 600px;
  width: 90%;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 2rem;
}
</style>
