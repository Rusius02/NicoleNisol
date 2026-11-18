<template>
    <div>
      <v-btn @click="openAddWorkshopDialog">Ajouter un atelier d'écriture</v-btn>
      <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
  
      <!-- Liste des Atelier d'écritures -->
      <v-data-table :items="workshops" :headers="headers" item-value="id">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon="mdi-pencil" variant="text" aria-label="Modifier l'atelier" @click="editWorkshop(item.raw)" />
          <v-btn icon="mdi-delete" variant="text" aria-label="Supprimer l'atelier" @click="deleteWorkshop(item.raw)" />
        </template>
      </v-data-table>
  
      <v-dialog v-model="dialog" max-width="500px">
  <v-card>
    <v-card-title>
      <span v-if="!editMode">Ajouter un atelier d'écriture</span>
      <span v-else>Modifier l'atelier d'écriture</span>
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="Workshop.name" label="Nom"></v-text-field>
      <v-text-field v-model="Workshop.description" label="Description"></v-text-field>
  <div>
    <!-- Date de début -->
    <v-menu
      v-model="menuStartDate"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator>
        <v-text-field
          v-model="Workshop.startDate"
          label="Date de début"
          prepend-icon="mdi-calendar"
          readonly
          @click="menuStartDate = true"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="Workshop.startDate"
        no-title
        scrollable
        @input="menuStartDate = false"
      ></v-date-picker>
    </v-menu>

    <!-- Date de fin -->
    <v-menu
      v-model="menuEndDate"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator>
        <v-text-field
          v-model="Workshop.endDate"
          label="Date de fin"
          prepend-icon="mdi-calendar"
          readonly
          @click="menuEndDate = true" 
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="Workshop.endDate"
        no-title
        scrollable
        :min="Workshop.startDate"
        @input="menuEndDate = false"
      ></v-date-picker>
    </v-menu>
  </div>
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
  import moment from 'moment';
  import { workshopService } from '@/services/workshopService';

  export default {
    name: 'WorkshopManagement',
    data() {
      return {
        menuStartDate: false, // Controls the start date picker menu
        menuEndDate: false, // Controls the end date picker menu
        headers: [
        { title: 'Nom', key: 'name' },
        { title: 'Thème', key: 'theme' },
        { title: 'Description', key: 'description' },
        { title: 'Date de début', key: 'startDate' },
        { title: 'Date de fin', key: 'endDate' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      workshops: [],
        dialog: false,
        editMode: false,
        Workshop: {}, 
        errorMessage: '',
      };
    },
    mounted() {
    this.fetchWorkshops();
  },
    methods: {
      async fetchWorkshops() {
      try {
        const workshops = await workshopService.getAll();
        this.errorMessage = '';
        this.workshops = workshops.map(workshop => ({
          ...workshop,
          startDate: moment(workshop.startDate).format('YYYY-MM-DD'),
          endDate: moment(workshop.endDate).format('YYYY-MM-DD'),
        }));
        } catch (error) {
          this.errorMessage = error.message || 'Impossible de charger les ateliers.';
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
      async saveWorkshop() {
  // Convert startDate and endDate to ISO strings for the API
  const InputDtoCreateWritingEvent = {
    id: this.Workshop.id,  // Add id for update requests
    name: this.Workshop.name,
    theme: this.Workshop.theme,
    description: this.Workshop.description,
    startDate: this.Workshop.startDate instanceof Date 
      ? this.Workshop.startDate.toISOString() 
      : new Date(this.Workshop.startDate).toISOString(),
    endDate: this.Workshop.endDate instanceof Date 
      ? this.Workshop.endDate.toISOString() 
      : new Date(this.Workshop.endDate).toISOString()
  };

  try {
    if (this.editMode) {
      await workshopService.update(this.Workshop.id, InputDtoCreateWritingEvent);
    } else {
      await workshopService.create(InputDtoCreateWritingEvent);
    }

    await this.fetchWorkshops();
    this.dialog = false;
  } catch (error) {
    this.errorMessage = error.message || 'Impossible d’enregistrer l’atelier.';
    console.error('Error saving workshop:', error);
  }
},
      // eslint-disable-next-line no-unused-vars
      deleteWorkshop(workshop) {
        if (confirm(`Voulez-vous vraiment supprimer l'atelier: ${workshop.name} ?`)) {
          workshopService.delete(workshop.id)
            .then(() => {
              this.workshops = this.workshops.filter(w => w.id !== workshop.id);
            })
            .catch(error => {
              this.errorMessage = error.message || 'Impossible de supprimer l’atelier.';
              console.error('Erreur lors de la suppression de l\'atelier:', error);
              alert('Une erreur est survenue lors de la suppression de l\'atelier.');
            });
        }
      },

    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  