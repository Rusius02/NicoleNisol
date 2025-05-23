<template>
    <div>
      <v-btn @click="openAddWorkshopDialog">Ajouter un atelier d'écriture</v-btn>
  
      <!-- Liste des Atelier d'écritures -->
      <v-data-table :items="workshops" :headers="headers">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="editWorkshop(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteWorkshop(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
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
  import axios from 'axios';
  import moment from 'moment';

  export default {
    name: 'WorkshopManagement',
    data() {
      return {
        menuStartDate: false, // Controls the start date picker menu
      menuEndDate: false, // Controls the end date picker menu
        headers: [
        { text: 'Name', value: 'name' },
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
      // If in edit mode, send a PUT request to update the workshop
      await axios.put('https://localhost:5001/api/WritingEvent/Update', InputDtoCreateWritingEvent, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Workshop updated:', InputDtoCreateWritingEvent);
    } else {
      // If not in edit mode, send a POST request to create a new workshop
      await axios.post('https://localhost:5001/api/WritingEvent/Create', InputDtoCreateWritingEvent, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Workshop created:', InputDtoCreateWritingEvent);
    }

    this.fetchWorkshops();  // Optionally refresh the workshops list after creation or update
    this.dialog = false;
  } catch (error) {
    console.error('Error saving workshop:', error);
  }
},
      // eslint-disable-next-line no-unused-vars
      deleteWorkshop(workshop) {
        if (confirm(`Voulez-vous vraiment supprimer l'atelier: ${workshop.name} ?`)) {
          axios
            .delete(`https://localhost:5001/api/WritingEvent/Delete`, {
              params: {
                id: workshop.id,  // Envoie l'ID de l'atelier à supprimer dans les paramètres de la requête
              },
            })
            .then(response => {
              if (response.status === 200 && response.data) {
                // Si la suppression a réussi, supprime l'atelier de la liste locale
                this.workshops = this.workshops.filter(w => w.id !== workshop.id);
                alert('Atelier supprimé avec succès');
              } else {
                alert('La suppression a échoué');
              }
            })
            .catch(error => {
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
  