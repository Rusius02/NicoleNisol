<template>
    <v-container class="workshop-page page-shell">
      <header class="page-heading">
        <p class="page-kicker">{{ $t('writing_workshops') }}</p>
        <h1 class="page-title">{{ $t('writing_workshops') }}</h1>
        <p class="page-intro">{{ $t('welcome.line4') }}</p>
      </header>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <!-- Message quand il n'y a pas d'ateliers -->
          <v-alert v-if="errorMessage" type="error" border="start" elevation="2">
            {{ errorMessage }}
          </v-alert>
          <v-alert v-else-if="workshops.length === 0" type="info" border="start" elevation="2">
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
              <v-card class="workshop-card" elevation="0">
                <v-img class="writing-pencil-image" :src="imageUrl" alt="Illustration d’un atelier d’écriture" cover></v-img>
                <v-card-title class="workshop-title">{{ workshop.name }}</v-card-title>
                <v-card-subtitle class="workshop-dates">{{ workshop.startDate }} — {{ workshop.endDate }}</v-card-subtitle>
                <v-card-text>{{ workshop.description }}</v-card-text>
  
                <!-- Bouton "Participer" -->
                <v-card-actions v-if="!isPast(workshop.endDate)">
                    <v-btn
                    color="primary"
                    block
                    class="workshop-button"
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
  import moment from "moment";
  import { workshopService } from "@/services/workshopService";
  
  export default {
    name: "WorkshopPage",
    data() {
      return {
        workshops: [], // Stocker les ateliers récupérés
        errorMessage: '',
      };
    },
    mounted() {
      this.fetchWorkshops();
    },
    computed: {
      imageUrl() {
      return require(`@/assets/img/writing_pencil.png`);
    }
    },
    methods: {
      // Méthode pour récupérer les ateliers d'écriture depuis l'API
      async fetchWorkshops() {
        try {
          const workshops = await workshopService.getAll();
          this.workshops = workshops.map((workshop) => ({
            ...workshop,
            startDate: moment(workshop.startDate).format("YYYY-MM-DD"),
            endDate: moment(workshop.endDate).format("YYYY-MM-DD"),
          }));
          this.errorMessage = '';
        } catch (error) {
          this.errorMessage = error.message || 'Impossible de charger les ateliers.';
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
    margin-bottom: 1.25rem;
  }

  .workshop-card {
    height: 100%;
    overflow: hidden;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    box-shadow: 0 8px 26px rgba(58, 42, 63, 0.04);
    transition: box-shadow 180ms ease, transform 180ms ease;
  }

  .workshop-card:hover {
    box-shadow: var(--shadow-soft);
    transform: translateY(-3px);
  }

  .writing-pencil-image {
    height: 180px;
    background: var(--color-lavender);
  }

  .workshop-title {
    padding: 1.25rem 1.25rem 0.5rem;
    color: var(--color-plum-dark);
    font-family: var(--font-display);
    font-size: 1.7rem;
    font-weight: 600;
    line-height: 1.1;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .workshop-dates {
    color: var(--color-sage);
    font-weight: 600;
  }

  .workshop-button {
    border-radius: 999px;
  }
  </style>
  