<template>
  <v-container fluid class="pa-0">
    <div class="hero-section">
      <div class="overlay d-flex align-center justify-center">
        <div class="welcome-card d-flex flex-wrap">
          <!-- Photo à gauche -->
          <div class="author-thumbnail d-flex justify-center align-center">
            <img src="@/assets/img/Nicole.jpeg" alt="Nicole Nisol" />
          </div>

          <!-- Texte à droite -->
          <div class="welcome-text">
            <h2>Bonjour et bienvenue !</h2>
            <p>
              {{ $t('welcome.line1') }}<br>
              {{ $t('welcome.line2') }}<br>
              {{ $t('welcome.line3') }}<br><br>
              {{ $t('welcome.line4') }}<br>
              {{ $t('welcome.line5') }}<br>
              {{ $t('welcome.line6') }}<br><br>
              {{ $t('welcome.line7') }}<br>
              {{ $t('welcome.line8') }}<br>
              <strong>{{ $t('welcome.signature') }}</strong>
            </p>

            <v-btn color="primary" class="mt-4 welcome-btn" @click="$router.push('/shop')">
              🌿 {{ $t('button.shop') }}
            </v-btn>
          </div>
        </div>
      </div>
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
.hero-section {
  height: 100vh;
  background-size: cover;
  background-position: center;
}

.overlay {
  width: 100%;
  height: 88%;
}

.welcome-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  max-width: 900px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  gap: 2rem;
}

.author-thumbnail img {
  width: 140px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}

.welcome-text {
  flex: 1;
  text-align: left;
  font-family: 'Arial', sans-serif;
}

.welcome-text h2 {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2c2c2c;
}

.welcome-text p {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
}

.welcome-text strong {
  font-family: 'Dancing Script', cursive;
  font-size: 20px;
  display: inline-block;
  margin-top: 1rem;
}

.welcome-btn {
  background-color: #6c63ff;
  color: white;
  font-weight: 600;
  border-radius: 25px;
  padding: 10px 20px;
  transition: background-color 0.3s;
}

.welcome-btn:hover {
  background-color: #4a45b5;
}
</style>