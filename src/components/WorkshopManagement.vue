<template>
    <div>
      <v-btn @click="openAddWorkshopDialog">Ajouter un atelier d'écriture</v-btn>
  
      <!-- Liste des Atelier d'écritures -->
      <v-data-table :items="workshops" :headers="headers">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="edit(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteWorkshop(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
  
      <!-- Dialog pour ajouter/modifier un Atelier d'écriture -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span v-if="!editMode">Ajouter un atelier d'écriture</span>
            <span v-else>Modifier le atelier d'écriture</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="Workshop.title" label="Titre"></v-text-field>
            <v-text-field v-model="Workshop.description" label="Description"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dialog = false">Annuler</v-btn>
            <v-btn @click="saveWorkshop">Enregistrer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import moment from 'moment';

  export default {
    name: 'WorkshopManagement',
    data() {
      return {
        headers: [
        { text: 'Title', value: 'name' },
        { text: 'Theme', value: 'theme' },
        { text: 'Description', value: 'description' },
        { text: 'Start Date', value: 'startDate' },
        { text: 'End Date', value: 'endDate' },
        { text: 'Actions', value: 'actions', sortable: false }, 
      ],
      workshops: [],
        dialog: false,
        editMode: false,
        Workshop: {}, // Atelier d'écriture en cours d'ajout ou de modification
      };
    },
    mounted() {
    this.fetchWorkshops();
  },
    methods: {
        async fetchWorkshops() {
      try {
        const response = await axios.get('https://localhost:5001/api/WritingEvent/GetAll');
        console.log('Fetched Data:', response.data);  // Log the data to inspect the structure
        this.workshops = response.data.map(workshop => ({
          ...workshop,
          startDate: moment(workshop.startDate).format('YYYY-MM-DD'),
          endDate: moment(workshop.endDate).format('YYYY-MM-DD'),
        }));
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    },
      openAddWorkshopDialog() {
        this.Workshop = {};
        this.editMode = false;
        this.dialog = true;
      },
      editWorkshop(Workshop) {
        this.Workshop = { ...Workshop };
        this.editMode = true;
        this.dialog = true;
      },
      saveWorkshop() {
        if (this.editMode) {
          // Modifier le Atelier d'écriture
        } else {
          // Ajouter un nouveau Atelier d'écriture
        }
        this.dialog = false;
      },
      // eslint-disable-next-line no-unused-vars
      deleteWorkshop(_Workshop) {
        // Supprimer le Atelier d'écriture
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  