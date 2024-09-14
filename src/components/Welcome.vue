<!-- Accueil.vue -->
<template>
  <v-carousel
    height="100%"
    progress="primary"
    hide-delimiters
  >
    <!-- First Slide: Welcome Section -->
    <v-carousel-item>
      <v-sheet height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <div class="welcome-section">
            <div class="author-thumbnail">
              <img src="@/assets/img/Nicole.jpeg" alt="Author Thumbnail">
            </div>
            <div class="welcome-text">
              <p>Chers lecteurs, chères lectrices,<br>
              Merci de votre visite sur mon site. <br>
              Voici quelques précisions pour y naviguer : <br>
              L'onglet "A propos" vous décrit mon rapport avec les mots et la manière dont je suis devenue auteure. <br>
              La rubrique "Boutique" vous permettra d'acheter mes livres. <br>
              Si vous voulez correspondre avec moi, vous pouvez le faire via l'onglet "Contact". Soyez assurés que je vous répondrai toujours personnellement (même si cela prend un peu de temps). <br>
              Merci de vos lectures. <br>
              Je vous adresse toutes mes amitiés, <br>
              Nicole Nisol</p>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>

    <!-- Other Slides -->
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

  
  <script>
  export default {
    name: 'AccueilPage',
    data() {
    return {
      slides: ['Second', 'Third', 'Fourth'] // Your other slides
    };
  }
  };
  </script>
  
  <style scoped>
  /* Styles specific to the Accueil component */
  .welcome-section {
    padding-top: -10%;
  font-family: 'Dancing Script', cursive;
  display: flex;
  flex-direction: column; /* Met les éléments en colonne */
  align-items: center; /* Centrage horizontal */
  justify-content: center; /* Centrage vertical */
  text-align: center; /* Alignement du texte au centre */
  height: 100%; /* Utilise toute la hauteur de la fenêtre */
  margin: 1% 10% 2%;
    border: solid 1px rgb(137, 137, 204);
    opacity: 0.9;
    background-color: rgb(230, 230, 250);
    border-radius: 25px;
    padding: 1% 5%;
}

.author-thumbnail img {
  width: 100px; /* Ajustez la taille selon vos besoins */
  height: auto;
  border-radius: 50%;
  margin-bottom: 20px; /* Ajoute de l'espace entre l'image et le texte */
}

.welcome-text {
  font-size: 16px;
  line-height: 1.6;
}

  </style>
  