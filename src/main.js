// main.js

import { createApp } from 'vue'; // Import createApp from Vue
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router'; // Import createRouter and createWebHistory from Vue Router

// Import components
import AccueilPage from './components/Welcome.vue';
import APropos from './components/About.vue';

const routes = [
  { path: '/', component: AccueilPage },
  { path: '/about', component: APropos }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);

app.use(router); // Use the router instance

app.mount('#app');
