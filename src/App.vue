<!-- App.vue -->

<template>
 <v-app>
    <NavigationBar /> <!-- Votre composant NavigationBar -->
    <div class="content">
      <router-view /> 
    </div>
    <FooterApp /> <!-- Votre composant Footer -->
  </v-app>
</template>

<script>
import NavigationBar from './components/NavBar.vue';
import FooterApp from './components/Footer.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'vuetify/styles';
export default {
  name: 'App',
  components: {
    NavigationBar,
    FooterApp
  },
};
</script>

<style>
/* Add your global styles here */
.content {
  padding-bottom: 80px; /* Adjust the value as needed */
  /* Add background image */
  background-image: url('./assets/img/backgroundLavande.jpeg');
  /* Set background size and position */
  background-size: cover;
  background-position: center;
}
.content * {
  /* Reset background for all child elements */
  background: none; /* Remove background for all child elements */
  /* Add other styles for child elements if needed */
}
</style>
