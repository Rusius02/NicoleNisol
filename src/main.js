import { createApp } from 'vue'; // Import createApp from Vue
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router'; // Import createRouter and createWebHistory from Vue Router

// Import components
import AccueilPage from './components/Welcome.vue';
import APropos from './components/About.vue';
import ShopView from './components/Shop.vue';

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const routes = [
  { path: '/', component: AccueilPage },
  { path: '/about', component: APropos },
  { path: '/shop', component: ShopView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);

// Use the router instance
app.use(router);

// Create Vuetify instance and use it with the app
const vuetify = createVuetify({
  components,
  directives
});

// Mount the app with Vuetify
app.use(vuetify).mount('#app');
