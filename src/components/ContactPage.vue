<template>
     <v-container style="opacity: 0.9;">
    <v-card>
      <v-card-title>Formulaire de contact</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="name" label="Name"></v-text-field>
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-textarea v-model="message" label="Message"></v-textarea>
          <v-btn type="submit" color="#6A5ACD">Submit</v-btn>
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
      message: ''
    };
  },
  methods: {
    submitForm() {
      // Here you can handle form submission, like sending data to backend or displaying a success message
      
    }
  }
};
  </script>
  
  <style scoped>

  </style>
  