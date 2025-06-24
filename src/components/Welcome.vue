<template>
  <v-container fluid class="pa-0">
    <div class="hero-section">
        <div class="overlay d-flex align-center justify-center">
          <div class="welcome-card">
            <div class="author-thumbnail">
              <img src="@/assets/img/Nicole.jpeg" alt="Nicole Nisol">
            </div>
            <div class="welcome-text">
              <p>
                {{ $t('welcome.line1') }}<br>
                {{ $t('welcome.line2') }}<br>
                {{ $t('welcome.line3') }}<br><br>
                {{ $t('welcome.line4') }}<br>
                {{ $t('welcome.line5') }}<br>
                {{ $t('welcome.line6') }}<br>
                {{ $t('welcome.line7') }}<br><br>
                {{ $t('welcome.line8') }}<br>
                {{ $t('welcome.line9') }}<br>
                <strong>{{ $t('welcome.signature') }}</strong>
              </p>

              <v-btn color="primary" class="mt-4" @click="$router.push('/shop')">
                {{ $t('button.shop') }}
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
.hero-background {
  height: 100vh;
}

.overlay {
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 88%;
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
  font-size: 20px;
  line-height: 1.5;
  font-family: 'Arial';
}
</style>
