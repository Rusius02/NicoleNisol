<template>
  <div class="facebook-container">
    <!-- Plugin Page Facebook -->
    <div class="fb-page"
         data-href="https://www.facebook.com/profile.php?id=61555357475491"
         data-tabs="timeline"
         data-width="1080"
         data-height="700"
         data-small-header="true"
         data-adapt-container-width="true"
         data-hide-cover="false"
         data-show-facepile="true">
    </div>
  </div>
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
  justify-content: center; /* Centre horizontalement */
  align-items: center;     /* Centre verticalement */   
  border-radius: 25px;
}

.fb-page {
  max-width: 75%;        /* Taille maximale pour la largeur du plugin */
}
</style>
