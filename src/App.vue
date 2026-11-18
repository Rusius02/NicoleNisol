<!-- App.vue -->

<template>
 <v-app class="site-app">
    <NavigationBar />
    <main class="content">
      <div v-if="isLoading" class="loading-indicator" role="status" aria-label="Chargement">
        <img src="@/assets/img/icons8-pen.gif" alt="">
      </div>
      <router-view />
    </main>
    <FooterApp />
  </v-app>
</template>

<script>
import NavigationBar from './components/NavBar.vue';
import FooterApp from './components/Footer.vue';
import { registerVisit } from '@/services/visitService';
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
    registerVisit().catch((error) => {
      console.error('Erreur lors de l’enregistrement de la visite :', error);
    });
    // Register global navigation guards or listen to router events to track loading state
    this.$router.beforeEach((to, from, next) => {
      this.isLoading = true; // Set loading state to true when navigation starts
      next();
    });
    //registerVisit();
    this.$router.afterEach(() => {
      this.isLoading = false; // Set loading state to false when navigation ends
    });
  }
};
</script>

<style>
.content {
  position: relative;
  flex: 1;
  min-width: 0;
  background: var(--color-paper);
}

.loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(250, 248, 243, 0.84);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-indicator img {
  width: 72px;
}
</style>
