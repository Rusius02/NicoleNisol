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
        const apiUrl = process.env.VUE_APP_API_URL;
        const url = `${apiUrl}/api/Users/Login`;

        const requestBody = {
          pseudo: this.pseudo,
          password: this.password
        };

        const headers = {
          'Content-Type': 'application/json',
          'accept': '*/*' 
        };

        axios.post(url, requestBody, { headers })
        .then(response => {
          const { userProxy } = response.data;
          authService.login(userProxy);
          this.dialog = false;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Login error:', error);
    }
},
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>
