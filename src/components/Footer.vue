<template>
  <v-footer style="background-color: #E6E6FA; border-top: 1px solid #ccc; padding: 0%;" app>
    <v-spacer></v-spacer>

    <v-label style="padding-right: 2%;">
      {{ $t('join_me_on_social_media') }}
    </v-label>

    <v-btn class="social" icon href="https://www.instagram.com/nicole_4202/" target="_blank">
      <v-icon>mdi-instagram</v-icon>
    </v-btn>
    <v-btn class="social" icon href="https://www.facebook.com/nisol1402/" target="_blank">
      <v-icon>mdi-facebook</v-icon>
    </v-btn>

    <!-- Lien vers la page CGU -->
    <v-btn
      text
      class="ml-4"
      :to="'/CGU'"
      style="text-transform: none; font-size: 0.9rem;"
    >
      Conditions d’utilisation
    </v-btn>

    <v-spacer></v-spacer>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterApp'
};
</script>

<style scoped>
.social {
  margin: 3px;
}
</style>
