<template>
  <v-container fluid class="pa-0">
    <div class="hero-section">
      <v-img :src="penImage" class="hero-background" cover>
        <div class="overlay d-flex align-center justify-center">
          <div class="welcome-card">
            <div class="author-thumbnail">
              <img src="@/assets/img/Nicole.jpeg" alt="Nicole Nisol">
            </div>
            <div class="welcome-text">
              <p>
                Chers lecteurs, chères lectrices,<br>
                Merci de votre visite sur mon site. <br>
                Voici quelques précisions pour y naviguer : <br><br>
                L'onglet "Ateliers d'écriture" me permet de vous délivrer des exercices d'écriture sur des thèmes divers et variés. <br>
                La rubrique "Boutique" vous permettra d'acheter mes livres. <br>
                Si vous voulez correspondre avec moi, vous pouvez le faire via l'onglet "Contact".<br>
                Soyez assurés que je vous répondrai toujours personnellement.<br><br>
                Merci de vos lectures.<br>
                Je vous adresse toutes mes amitiés,<br>
                <strong>Nicole Nisol</strong>
              </p>
              <v-btn color="primary" class="mt-4" @click="$router.push('/shop')">
                Découvrir mes écrits
              </v-btn>
            </div>
          </div>
        </div>
      </v-img>
    </div>
  </v-container>
</template>

<script>
import penImage from '@/assets/img/pen.jpg'; // Assure-toi que ce chemin est correct

export default {
  name: 'AccueilPage',
  data() {
    return {
      penImage,
    };
  },
};
</script>

<style scoped>
.hero-background {
  height: 100vh;
}

.overlay {
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 100%;
}

.welcome-card {
  background-color: rgba(230, 230, 250, 0.95);
  border-radius: 25px;
  padding: 2rem;
  max-width: 700px;
  text-align: center;
  font-family: 'Dancing Script', cursive;
  border: 1px solid #8990cc;
}

.author-thumbnail img {
  width: 150px;
  height: auto;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.welcome-text p {
  font-size: 16px;
  line-height: 1.7;
}
</style>
