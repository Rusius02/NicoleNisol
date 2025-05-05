import { createApp } from 'vue'; // Import createApp from Vue
import App from './App.vue';
import store from './vuex/store';
import { createRouter, createWebHistory } from 'vue-router'; // Import createRouter and createWebHistory from Vue Router

import { createI18n } from 'vue-i18n';

import fr from './locales/fr.json';
import en from './locales/en.json';
import nl from './locales/nl.json';
import es from './locales/es.json';
import de from './locales/de.json';

// Import components
import AccueilPage from './components/Welcome.vue';
import APropos from './components/About.vue';
import ShopView from './components/Shop.vue';
import ContactPage from './components/ContactPage.vue';
import CheckoutPage from '@/components/Checkout.vue'; 
import AdminPage from '@/components/Admin.vue'; 
import WorkshopPage from '@/components/Workshop.vue'; 
import ConfirmationPage from './pages/ConfirmationPage.vue';

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; 

const routes = [
  { path: '/', component: AccueilPage },
  { path: '/about', component: APropos },
  { path: '/shop', component: ShopView },
  { path: '/contact', component: ContactPage },
  { path: '/checkout', component: CheckoutPage },
  { path: '/admin', component: AdminPage },
  { path: '/workshop', component: WorkshopPage },
  { path: '/confirmation', component: ConfirmationPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const i18n = createI18n({
  legacy: false, // Composition API support
  locale: 'fr',
  fallbackLocale: 'en',
  messages: { fr, en, nl, es, de },
});


const app = createApp(App);

// Use the router instance
app.use(router);
//Use the store
app.use(store); 
//Translations
app.use(i18n);
// Create Vuetify instance and use it with the app
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdiSvg', // Ensure you configure Vuetify to use MDI iconfont
  },
});

// Mount the app with Vuetify
app.use(vuetify).mount('#app');
