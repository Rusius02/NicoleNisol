<template>
    <v-container class="py-10">
      <v-card class="pa-6" elevation="3">
        <v-card-title class="text-h5 font-weight-bold">
          Conditions Générales d’Utilisation – Nicole Nisol
        </v-card-title>
        <v-divider class="my-4" />
  
        <v-card-text>
          <p class="text-body-1 font-italic mb-6">
            Dernière mise à jour : Juin 2025 <br />
            Merci de lire attentivement les présentes Conditions Générales d’Utilisation avant de naviguer sur le site.
          </p>
  
          <v-expansion-panels multiple>
            <v-expansion-panel v-for="(article, index) in articles" :key="index">
              <v-expansion-panel-title class="font-weight-medium">
                {{ article.title }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div v-html="article.content" />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'CGU',
    data() {
      return {
        articles: [
          {
            title: '1. Description et finalité du site',
            content: `
              <p>nicolenisol.com est un site dédié à l’activité littéraire de Nicole Nisol, autrice de nouvelles. Il présente ses œuvres, actualités, articles, ainsi qu'une boutique permettant l’achat de ses livres au format papier ou numérique.</p>
            `
          },
          {
            title: '2. Accès au site et acceptation des CGU',
            content: `
              <p>L’accès au site implique l’acceptation pleine et entière des présentes CGU par l’utilisateur. En accédant au site, l’utilisateur garantit être majeur et utiliser des informations exactes.</p>
              <p>Les CGU peuvent être modifiées à tout moment. L’utilisateur est invité à les consulter régulièrement.</p>
            `
          },
          {
            title: '3. Conditions d’utilisation',
            content: `
              <p>L’utilisateur s’engage à ne pas publier de contenu illégal, diffamatoire, offensant ou contraire à l’ordre public.</p>
              <p>Il doit également veiller à utiliser un navigateur moderne acceptant les cookies et le JavaScript.</p>
            `
          },
          {
            title: '4. Responsabilité de l’utilisateur',
            content: `
              <p>Chaque utilisateur est seul responsable du contenu qu’il publie sur le site, notamment dans les zones de commentaires.</p>
              <p>nicolenisol.com ne pourra être tenue responsable des propos tenus par des tiers.</p>
            `
          },
          {
            title: '5. Propriété intellectuelle',
            content: `
              <p>Tous les contenus du site (textes, images, vidéos, marques...) sont protégés par le droit d’auteur. Toute reproduction, même partielle, est strictement interdite sans autorisation écrite préalable.</p>
            `
          },
          {
            title: '6. Données personnelles & cookies',
            content: `
              <p>Les données personnelles sont traitées conformément à la politique de confidentialité. Le site utilise des cookies pour améliorer l’expérience utilisateur. Voir la section « Confidentialité » pour plus d’informations.</p>
            `
          },
          {
            title: '7. Vente en ligne & boutique',
            content: `
              <p>La boutique du site permet d’acheter directement les ouvrages de Nicole Nisol. Les transactions sont sécurisées. Toute commande implique l’acceptation des conditions de vente spécifiques visibles dans la rubrique « Boutique ».</p>
            `
          },
          {
            title: '8. Droit applicable',
            content: `
              <p>Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux compétents seront ceux de Paris.</p>
            `
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  p {
    margin-bottom: 1em;
  }
  </style>
  