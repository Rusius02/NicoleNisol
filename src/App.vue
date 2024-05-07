<!-- App.vue -->

<template>
 <v-app>
    <NavigationBar /> <!-- Votre composant NavigationBar -->
    <div class="content">
       <!-- Loading indicator -->
    <div v-if="isLoading" class="loading-indicator">
      <img src="@/assets/img/icons8-pen.gif" alt="Loading Animation">
    </div>
      <router-view /> 
    </div>
    <FooterApp /> <!-- Votre composant Footer -->
  </v-app>
</template>

<script>
import NavigationBar from './components/NavBar.vue';
import FooterApp from './components/Footer.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'vuetify/styles';
export default {
  name: 'App',
  components: {
    NavigationBar,
    FooterApp
  },
  data() {
    return {
      isLoading: false // Initial loading state
    };
  },
  created() {
    // Register global navigation guards or listen to router events to track loading state
    this.$router.beforeEach((to, from, next) => {
      this.isLoading = true; // Set loading state to true when navigation starts
      next();
    });

    this.$router.afterEach(() => {
      this.isLoading = false; // Set loading state to false when navigation ends
    });
  }
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
  height: 100%;
}
.content * {
  /* Reset background for all child elements */
  background: none; /* Remove background for all child elements */
  /* Add other styles for child elements if needed */
}
.loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it appears above other content */
}

.loading-indicator img {
  width: 100px; /* Adjust the size of the loading animation as needed */
}
</style>
