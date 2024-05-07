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
          <v-text-field v-model="mail" label="E-mail" outlined></v-text-field>
          <v-text-field v-model="pseudo" label="Pseudo" outlined></v-text-field>
          <v-text-field v-model="password" label="Mot de passe" outlined type="password"></v-text-field>
          <v-btn type="submit" color="primary">S'inscrire</v-btn>
          <v-btn @click="closeDialog" color="red">Annuler</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import authService from '@/services/authService';
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      sexe: '',
      birthDate: '',
      mail: '',
      pseudo: '',
      password: '',
      dialog: false
    };
  },
  methods: {
    async register() {
      try {
        // Define the endpoint URL
        const url = 'https://localhost:5001/api/Users/SignIn';

        // Define the request body containing user information
        const requestBody = {
          firstName: this.firstName,
          lastName: this.lastName,
          sexe: this.sexe,
          birthDate: this.birthDate,
          mail: this.mail,
          pseudo: this.pseudo,
          password: this.password
        };

        // Define the headers
        const headers = {
          'Content-Type': 'application/json',
          'accept': '*/*' // Optional, depending on the API requirements
        };

        axios.post(url, requestBody, { headers })
          .then(response => {
            // Handle successful response
            console.log('Response:', response);
            const { userProxy } = response.data;
            authService.login(userProxy);
            this.dialog = false;
          })
          .catch(error => {
            // Handle error
            console.error('Error:', error);
          });
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
    closeDialog() {
      // Close the dialog without registering
      this.dialog = false;
    }
  }
};
</script>
