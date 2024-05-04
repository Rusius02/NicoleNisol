<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" persistent>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" @click="dialog = !dialog"> <!-- Bind the click event directly -->
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="pseudo" label="Username" outlined></v-text-field>
          <v-text-field v-model="password" label="Password" outlined type="password"></v-text-field>
          <v-btn type="submit" color="primary">Se connecter</v-btn>
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
      pseudo: '',
      password: '',
      dialog: false
    };
  },
  methods: {
    async login() {
  try {
    // Define the endpoint URL
    const url = 'https://localhost:5001/api/Users/Login';

    // Define the request body containing pseudo and password
    const requestBody = {
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
    console.error('Login error:', error);
  }
},
    closeDialog() {
      // Close the dialog without logging in
      this.dialog = false;
    }
  }
};
</script>
