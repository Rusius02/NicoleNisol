<!-- App.vue -->

<template>
 <v-app>
    <NavigationBar /> <!-- Votre composant NavigationBar -->
    <router-view /> <!-- Le contenu de chaque page -->
    <FooterApp /> <!-- Votre composant Footer -->
  </v-app>
</template>

<script>
import NavigationBar from './components/NavBar.vue';
import FooterApp from './components/Footer.vue';
import 'bootstrap/dist/css/bootstrap.css';
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
</style>
