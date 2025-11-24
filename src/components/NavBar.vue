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
            <a class="nav-link" href="/">{{ $t('home') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/shop">{{ $t('shop') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/contact">{{ $t('contact') }}</a>
          </li>
          <div class="dropdown">
            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img :src="currentFlag" class="flag-icon me-2" /> {{ currentLangText }}
            </button>
            <ul class="dropdown-menu">
              <li v-for="lang in languages" :key="lang.value">
                <a class="dropdown-item d-flex align-items-center" href="#" @click.prevent="setLanguage(lang.value)">
                  <img :src="lang.flag" class="flag-icon me-2" /> {{ lang.text }}
                </a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import authService from '@/services/authService';
import { mapState } from 'vuex';
export default {
  name: 'NavigationBar',
  data() {
    return {
      isLoggedIn: false, // Flag to track user's authentication status
      username: '', // Store the username of the authenticated user
      basketPanel: false,
      currentLocale: this.$i18n.locale,
      languages: [
        { value: 'fr', text: 'Français', flag: require('@/assets/flags/fr.png') },
        { value: 'en', text: 'English', flag: require('@/assets/flags/en.png') },
        { value: 'nl', text: 'Nederlands', flag: require('@/assets/flags/nl.png') },
        { value: 'es', text: 'Español', flag: require('@/assets/flags/es.png') },
        { value: 'de', text: 'Deutsch', flag: require('@/assets/flags/de.png') }
      ]
    };
  },
  computed: {
    ...mapState({
      basketItems: state => state.basket.items,
    }),
    basketItemCount() {
      return this.$store.state.basket.items.length; // Access basketItems computed property
    },
    currentLangText() {
      const lang = this.languages.find(l => l.value === this.currentLocale);
      return lang ? lang.text : '';
    },
    currentFlag() {
      const lang = this.languages.find(l => l.value === this.currentLocale);
      return lang ? lang.flag : '';
    }
  },
  methods: {
    toggleBasketPanel() {
      this.basketPanel = !this.basketPanel;
    },
    setLanguage(lang) {
      this.currentLocale = lang;
      this.$i18n.locale = lang;
      localStorage.setItem('lang', lang);
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
    const saved = localStorage.getItem('lang');
    if (saved) this.$i18n.locale = saved;
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
.flag-icon {
  width: 24px;
  height: 16px;
  object-fit: cover;
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
