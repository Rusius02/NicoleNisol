<!-- Shop.vue -->

<template>
   <div class="book-container">
    <!-- Display BookItems -->
    <BookItem v-for="(book, index) in books" :key="index" :title="book.title" :description="book.description" :imageName="book.imageName" :prix="book.prix" :priceIDFromStripe="book.priceIDFromStripe" :isLeftAligned="index % 2 === 0" />
  </div>
  </template>
  
  <script>
  import BookItem from './BookItem.vue';
  
  export default {
    name: 'ShopView',
    components: {
      BookItem,
    },
    data() {
      return {
        books: [
          {
            title: 'Henriette noire gaillette',
            description: "En vidant la maison de sa grand-mère partie au home, une dame découvre un cahier d'enfant. Il lui apprendra bien des secrets...",
            imageName: 'Henriette.jpeg', 
            prix: 5,
            priceIDFromStripe: 'price_1PVTfKLttUxb3ZIRn6nfsl6y'
          },
          {
            title: 'Sur le fil ténu de la vie',
            description: "Sur le fil ténu de la vie, nous avançons tels des funambules. Dans le jardin des libellules, Lilly découvre que parfois on gomme une partie de sa vie, que l'on préfère oublier. La mémoire serait-elle sélective? Les cicatrices, parfois visibles, parfois cachées; si elles guérissent, laissent néanmoins des empreintes éternelles comme les floraisons des marronniers dans les cours d'école.",
            imageName: 'SurLeFilTenuDeLaVie.jpeg', 
            prix: 7,
            priceIDFromStripe: 'price_1PVTpRLttUxb3ZIR0ZlPkORT'
          },
          {
            title: "L'eau de là",
            description: "Un recueil de trois nouvelles qui ont pour décor un cours d'eau. Tantôt stagnante, près d'un marais, tantôt près de l'océan où un phare éteint ne guide plus les marins et une autre fois près d'un ruisseau qui peut surprendre par son cours tumultueux",
            imageName: 'LeauDeLa.jpeg', 
            prix: 14,
            priceIDFromStripe: 'price_1PVTr2LttUxb3ZIRXjwpenQq'
          },
          {
            title: 'Kaléidoscope',
            description: "L'autrice belge Claire Lussac retourne dans le village de son enfance. Elle a rendez-vous avec le notaire pour la vente de sa maison. En se promenant, elle revoit sa vie comme dans un kaléidoscope, images floues du passé.",
            imageName: 'Kaleidoscope.jpeg', 
            prix: 7,
            priceIDFromStripe: 'price_1PVTtrLttUxb3ZIRpWj8i6WH'
          },
          {
            title: 'Un pommier sur la rive',
            description: "Normandie dans les années 1950, Julia revient au village pour enseigner. Elle retrouve sa mère, qui n'a pas changé toujours en proie à la mélancolie, à la dépression. En même temps, sur les bords du Rhin, Emma coule des jours paisibles dans sa petite librairie. Des destins de femme liés par l'Histoire.",
            imageName: 'UnPommierSurLaRive.jpeg', 
            prix: 12,
            priceIDFromStripe: 'price_1PVTwdLttUxb3ZIR9ctLtFjt'
          },
          {  
            title: "L'anagramme",
            description: "Marie quitte un jour son village pour aller travailler à Bruxelles, elle n'a que treize ans. Elle y rencontre l'amour, mais cet amour est impossible. Le destin cruel va la marier au veuf de sa soeur pour élever les enfants. Ce qu'elle fera avec courage, avec tout l'amour qu'elle porte en elle",
            imageName: 'Anagramme.jpeg',
            prix: 12,
            priceIDFromStripe: 'price_1PVU2tLttUxb3ZIR1qWeMO1F'
          },
          {  
            title: "La balançoire",
            description: "Manon a quarante ans, elle se regarde dans le miroir. Elle se dit qu'elle n'a pas d'attache, plus de famille...Elle va partir avec médecin sans frontière. Mais elle reçoit une enveloppe qui va bouleverser sa vie.",
            imageName: 'LaBalancoire.jpeg',
            prix: 7,
            priceIDFromStripe: 'price_1PVU4mLttUxb3ZIRRVOWVv6Q'
          },
          {  
            title: "Alex",
            description: "Découvrir Alex Ses différences, ses renaissances, son absolu... Et si Alex n'était pas celui que l'on croit...",
            imageName: 'Alex.jpeg',
            prix: 7,
            priceIDFromStripe: 'price_1PT5BHLttUxb3ZIRtkpZ1zuF'
          },
          {
            title: 'Comme un vieux telegramme',
            description: "Laura et Tom, une histoire d'amour d'adolescents, celui qui reste sage, on s'effleure du bout des lèvres, on se donne la main. Un jour la vie les éloigne. Ils continuent leur chemin, jusqu'à ce que Laura envoie un sms aux allures de vieux télégramme à Tom pour l'inviter à son mariage dans une vieille chapelle provençale.",
            imageName: 'Telegramme.jpeg', 
            prix: 10,
            priceIDFromStripe: 'price_1PVU6hLttUxb3ZIRxJdy7nL6'
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to the Shop component */
  .book-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
    justify-content: space-around;
}


/* Media query for computer screens */
@media screen and (min-width: 768px) {
  .book-item {
    width: 50%; /* Display two items per row */
  }
}

/* Media query for mobile devices */
@media screen and (max-width: 767px) {
  .book-item {
    width: 100%; /* Display one item per row */
  }
}
  </style>
  