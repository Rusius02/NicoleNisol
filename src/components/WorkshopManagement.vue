<template>
    <div>
      <v-btn @click="openAddWorkshopDialog">Ajouter un livre</v-btn>
  
      <!-- Liste des livres -->
      <v-data-table :items="Workshops" :headers="headers">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="edit(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteWorkshop(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
  
      <!-- Dialog pour ajouter/modifier un livre -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span v-if="!editMode">Ajouter un livre</span>
            <span v-else>Modifier le livre</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="Workshop.title" label="Titre"></v-text-field>
            <v-text-field v-model="Workshop.description" label="Description"></v-text-field>
            <v-text-field v-model="Workshop.price" label="Prix"></v-text-field>
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
  export default {
    name: 'WorkshopManagement',
    data() {
      return {
        Workshops: [], // Liste des livres
        headers: [
          { text: 'Titre', value: 'title' },
          { text: 'Description', value: 'description' },
          { text: 'Prix', value: 'price' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        dialog: false,
        editMode: false,
        Workshop: {}, // Livre en cours d'ajout ou de modification
      };
    },
    methods: {
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
          // Modifier le livre
        } else {
          // Ajouter un nouveau livre
        }
        this.dialog = false;
      },
      // eslint-disable-next-line no-unused-vars
      deleteWorkshop(_Workshop) {
        // Supprimer le livre
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  