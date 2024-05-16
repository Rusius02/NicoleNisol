import { createApp } from 'vue'; // Import createApp from Vue
import App from './App.vue';
import store from './vuex/store';
import { createRouter, createWebHistory } from 'vue-router'; // Import createRouter and createWebHistory from Vue Router

// Import components
import AccueilPage from './components/Welcome.vue';
import APropos from './components/About.vue';
import ShopView from './components/Shop.vue';
import ContactPage from './components/ContactPage.vue';

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; 

const routes = [
  { path: '/', component: AccueilPage },
  { path: '/about', component: APropos },
  { path: '/shop', component: ShopView },
  { path: '/contact', component: ContactPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);

// Use the router instance
app.use(router);
//Use the store
app.use(store); 

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
