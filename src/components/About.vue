<template>
  <section class="about-page page-shell">
    <header class="page-heading">
      <p class="page-kicker">{{ $t('news') }}</p>
      <h1 class="page-title">{{ $t('welcome.signature') }}</h1>
      <p class="page-intro">{{ $t('welcome.line2') }}</p>
    </header>

    <div class="facebook-container">
      <div
        class="fb-page"
        data-href="https://www.facebook.com/profile.php?id=61555357475491"
        data-tabs="timeline"
        data-width="1080"
        data-height="700"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'APropos',
  mounted() {
    // Charger dynamiquement le SDK Facebook si nécessaire
    if (!document.getElementById('facebook-jssdk')) {
      let script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }
  }
}
</script>

<style scoped>
.facebook-container {
  display: flex;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.fb-page {
  width: 100%;
  max-width: 760px;
  overflow: hidden;
}

@media (max-width: 600px) {
  .facebook-container {
    padding: 0.75rem;
  }
}
</style>
