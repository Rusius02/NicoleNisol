<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h2>Gestion des utilisateurs</h2>
            </v-card-title>
            <v-card-text>
              <v-data-table :headers="headers" :items="users" item-key="id">
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn icon @click="editUser(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteUser(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Dialog pour modifier un utilisateur -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            Modifier l'utilisateur
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="editedUser.name" label="Nom"></v-text-field>
            <v-text-field v-model="editedUser.email" label="Email"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dialog = false">Annuler</v-btn>
            <v-btn @click="saveUser">Enregistrer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'UserManagement',
    data() {
      return {
        dialog: false,
        headers: [
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Pseudo', value: 'pseudo' },
        { text: 'Email', value: 'mail' },
        { text: 'Sexe', value: 'sexe' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
        users: [],
        editedUser: {},
      };
    },
    mounted() {
    this.fetchUsers();
  },
    methods: {
        async fetchUsers() {
      try {
        const response = await axios.get('https://localhost:5001/api/Users/GetAll');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
      editUser(user) {
        this.editedUser = { ...user };
        this.dialog = true;
      },
      deleteUser(user) {
        // Logique pour supprimer l'utilisateur
        this.users = this.users.filter(u => u.id !== user.id);
      },
      saveUser() {
        // Logique pour enregistrer les modifications de l'utilisateur
        const index = this.users.findIndex(u => u.id === this.editedUser.id);
        if (index !== -1) {
          this.users[index] = this.editedUser;
        }
        this.dialog = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles for your table and dialogs */
  .v-card {
    min-height: 400px;
  }
  </style>
  