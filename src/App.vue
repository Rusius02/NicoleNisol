<!-- App.vue -->

<template>
  <div id="app">
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from './components/NavBar.vue';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'App',
  components: {
    NavigationBar,
  },
};
</script>

<style>
/* Add your global styles here */
</style>
