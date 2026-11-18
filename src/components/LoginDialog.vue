<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" persistent>
    <template v-slot:activator="{ on }">
      <div class="dropdown-item" v-on="on" @click="dialog = !dialog">
         <v-icon>mdi-account</v-icon>
        Se connecter
      </div>
      
    </template>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="E-mail" type="email" outlined></v-text-field>
          <v-text-field v-model="password" label="Password" outlined type="password"></v-text-field>
          <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
          <v-btn type="submit" color="primary">Se connecter</v-btn>
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
      email: '',
      password: '',
      errorMessage: '',
      dialog: false
    };
  },
  methods: {
    async login() {
      try {
        await authService.login(this.email, this.password);
        this.errorMessage = '';
        this.dialog = false;
      } catch (error) {
        this.errorMessage = error.message || 'Connexion impossible.';
      }
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>
