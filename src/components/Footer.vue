<template>
  <v-footer style="background-color: #E6E6FA; border-top: 1px solid #ccc; padding: 0%;" app>
    <v-spacer></v-spacer>
    <v-label style="padding-right: 2%;">{{ $t('join_me_on_social_media') }}</v-label>
    <v-btn class="social" icon href="https://www.instagram.com/nicole_4202/" target="_blank">
      <v-icon>mdi-instagram</v-icon>
    </v-btn>
    <v-btn class="social" icon href="https://www.facebook.com/nisol1402/" target="_blank">
      <v-icon>mdi-facebook</v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterApp'
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires selon vos besoins */
.social{
  margin: 3px;
}
</style>
