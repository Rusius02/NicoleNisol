<!-- NavigationBar.vue -->

<template>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #E6E6FA; border-bottom: 1px solid #ccc;">
      <div class="container d-flex justify-content-between align-items-center">
        <div class="navbar-brand" style="font-family: 'Dancing Script', cursive;">Nicole Nisol</div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav space-evenly align-items-center" style="font-family: 'Dancing Script', cursive;">
            <li class="nav-item">
              <a class="nav-link" href="/">Accueil</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">A propos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/shop">Boutique</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavigationBar',
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
  