<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #E6E6FA; border-bottom: 1px solid #ccc;">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="navbar-brand" style="font-family: 'Dancing Script', cursive;">Nicole Nisol</div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav space-evenly align-items-center" style="font-family: 'Dancing Script', cursive;">
          <li class="nav-item">
            <a class="nav-link" href="/">Accueil</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">Actualités</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/workshop">Ateliers d'écriture</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/shop">Boutique</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/contact">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="toggleBasketPanel">
              <v-icon>mdi-cart</v-icon> 
              <v-badge :content="basketItemCount" v-if="basketItemCount" color="green" overlap></v-badge> Panier
            </a>
          </li>
          <template v-if="!isLoggedIn">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="authDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Authentification
              </a>
              <div class="dropdown-menu" aria-labelledby="authDropdown">
                <LoginDialog ref="loginDialog" />
                <SignInDialog ref="signInDialog" />
              </div>
            </li>
          </template>
          <!-- End of conditional rendering -->
          <template v-else>
  <!-- Dropdown for authenticated user -->
  <li class="nav-item dropdown">
    <a 
      class="nav-link dropdown-toggle" 
      href="#" 
      id="navbarDropdown" 
      role="button" 
      data-bs-toggle="dropdown" 
      aria-haspopup="true" 
      aria-expanded="false">
      {{ username }} <!-- Display the username -->
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <!-- New "Gestion" menu item -->
      <a class="dropdown-item" href="/admin">Gestion</a> <!-- Link to /manage -->
      <div class="dropdown-divider"></div> <!-- Optional: Divider line -->
      <a class="dropdown-item" href="#" @click="logout">Déconnexion</a> <!-- Logout option -->
    </div>
  </li>
</template>
        </ul>
      </div>
    </div>
  </nav>
  <v-navigation-drawer v-model="basketPanel" right absolute>
    <BasketPanel :items="basketItems"></BasketPanel>
  </v-navigation-drawer>
  <v-overlay v-if="basketPanel" @click="toggleBasketPanel"></v-overlay>
</template>

<script>
import BasketPanel from '@/components/BasketPanel.vue';
import LoginDialog from '@/components/LoginDialog.vue';
import SignInDialog from '@/components/SignInDialog.vue';
import authService from '@/services/authService';
import { mapState } from 'vuex';
export default {
  name: 'NavigationBar',
  components: {
    BasketPanel,
    LoginDialog,
    SignInDialog
  },
  data() {
    return {
      isLoggedIn: false, // Flag to track user's authentication status
      username: '', // Store the username of the authenticated user
      basketPanel: false
    };
  },
  computed: {
    ...mapState({
      basketItems: state => state.basket.items,
    }),
    basketItemCount() {
      return this.$store.state.basket.items.length; // Access basketItems computed property
    }
  },
  methods: {
    toggleBasketPanel() {
      this.basketPanel = !this.basketPanel;
    },
    logout() {
      // Perform logout action
      // Example: Clear authentication token from local storage
      localStorage.removeItem('token');
      // Update authentication status
      this.isLoggedIn = false;
    },
    updateAuthenticationStatus() {
      const token = authService.getToken();
      if (token) {
        this.isLoggedIn = true;
        this.username = authService.getCurrentUser().pseudo;
      } else {
        this.isLoggedIn = false;
        this.username = '';
      }
    }
  },
  mounted() {
    // Check authentication status on component mount
    this.updateAuthenticationStatus();
  },
  created() {
    // Watch for changes to authentication status
    this.$watch(
      () => authService.getToken(),
      () => {
        this.updateAuthenticationStatus();
      }
    );
  }
};
</script>

<style scoped>
/* Navbar styles */
.navbar {
  width: 100%; /* Ensure navbar takes up full width */
  font-size: 18px; /* Adjust font size */
  font-weight: 500; /* Adjust font weight */
}
.navbar-nav.space-evenly {
  display: flex;
  justify-content: space-evenly;
  width: 100%; /* Ensure the navbar items take up the full width */
}
.navbar-nav .nav-item .nav-link {
  transition: color 0.3s ease; /* Smooth transition effect */
  padding: 10px 20px; 
}
.navbar-nav .nav-item .nav-link:hover {
  color: #6A5ACD; /* Change the text color on hover */
  background-color: #D8BFD8; /* Lighter background color on hover */
  border-radius: 30px; /* Add border-radius */
}
</style>
