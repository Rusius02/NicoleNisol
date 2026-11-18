<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" persistent>
    <template v-slot:activator="{ on }">
      <div class="dropdown-item" v-on="on" @click="dialog = !dialog">
         <v-icon>mdi-account-plus</v-icon>
        S'inscrire
      </div>
    </template>
    <v-card>
      <v-card-title>Inscription</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field v-model="firstName" label="Prénom" outlined></v-text-field>
          <v-text-field v-model="lastName" label="Nom" outlined></v-text-field>
          <v-text-field v-model="sexe" label="Sexe" outlined></v-text-field>
          <v-text-field v-model="birthDate" label="Date de naissance" outlined></v-text-field>
          <v-text-field v-model="email" label="E-mail" type="email" outlined></v-text-field>
          <v-text-field v-model="pseudo" label="Pseudo" outlined></v-text-field>
          <v-text-field v-model="password" label="Mot de passe" outlined type="password"></v-text-field>
          <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
          <v-btn type="submit" color="primary">S'inscrire</v-btn>
          <v-btn @click="closeDialog" color="red">Annuler</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import authService from '@/services/authService';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      sexe: '',
      birthDate: '',
      email: '',
      pseudo: '',
      password: '',
      errorMessage: '',
      dialog: false
    };
  },
  methods: {
    async register() {
      try {
        await authService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          sexe: this.sexe,
          birthDate: this.birthDate,
          email: this.email,
          pseudo: this.pseudo
        }, this.password);
        this.errorMessage = '';
        this.dialog = false;
      } catch (error) {
        this.errorMessage = error.message || 'Inscription impossible.';
      }
    },
    closeDialog() {
      // Close the dialog without registering
      this.dialog = false;
    }
  }
};
</script>
