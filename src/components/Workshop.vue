<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <!-- Message quand il n'y a pas d'ateliers -->
          <v-alert v-if="workshops.length === 0" type="info" border="left" elevation="2">
            Aucun atelier disponible pour le moment.
          </v-alert>
  
          <!-- Liste des ateliers d'écriture -->
          <v-row v-else>
            <v-col
              v-for="(workshop, index) in workshops"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              class="workshop-item"
            >
              <v-card outlined>
                <v-card-title>{{ workshop.name }}</v-card-title>
                <v-card-subtitle>{{ workshop.startDate }} - {{ workshop.endDate }}</v-card-subtitle>
                <v-card-text>{{ workshop.description }}</v-card-text>
  
                <!-- Bouton "Participer" -->
                <v-card-actions v-if="!isPast(workshop.endDate)">
                    <v-btn
                    color="primary"
                    block
                    @click="participate(workshop.name, workshop.startDate, workshop.endDate)"
                    >
                        Participer
                    </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  import moment from "moment";
  
  export default {
    name: "WorkshopPage",
    data() {
      return {
        workshops: [], // Stocker les ateliers récupérés
      };
    },
    mounted() {
      this.fetchWorkshops();
    },
    methods: {
      // Méthode pour récupérer les ateliers d'écriture depuis l'API
      async fetchWorkshops() {
        try {
          const response = await axios.get("https://localhost:5001/api/WritingEvent/GetAll");
          this.workshops = response.data.map((workshop) => ({
            ...workshop,
            startDate: moment(workshop.startDate).format("YYYY-MM-DD"),
            endDate: moment(workshop.endDate).format("YYYY-MM-DD"),
          }));
        } catch (error) {
          console.error("Error fetching workshops:", error);
        }
      },
  
      // Méthode pour vérifier si la date de fin est passée
      isPast(endDate) {
        const today = moment().format("YYYY-MM-DD");
        return moment(endDate).isBefore(today);
      },
  
      // Méthode pour générer un email avec les détails de l'atelier sélectionné
      participate(workshopName, startDate, endDate) {
        const subject = `Participation à l'atelier: ${workshopName}`;
        const body = `Bonjour,\n\nJe souhaite participer à l'atelier d'écriture suivant:\n\nTitre: ${workshopName}\nDate de début: ${startDate}\nDate de fin: ${endDate}\n\nMerci.`;
        const mailToLink = `mailto:nicole.nisol1962@hotmail.be?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
  
        // Ouvre le client mail avec les informations pré-remplies
        window.location.href = mailToLink;
      },
    },
  };
  </script>
  
  <style scoped>
  .workshop-item {
    margin-bottom: 20px;
  }
  </style>
  