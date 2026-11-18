<template>
  <v-container>
    <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
      {{ errorMessage }}
    </v-alert>

    <v-data-table
      :headers="headers"
      :items="users"
      item-value="uid"
      :loading="isLoading"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="text"
          aria-label="Modifier l'utilisateur"
          @click="editUser(item.raw)"
        />
        <v-btn
          icon="mdi-delete"
          variant="text"
          aria-label="Supprimer l'utilisateur"
          @click="deleteUser(item.raw)"
        />
      </template>
      <template #no-data>
        <span v-if="!isLoading">Aucun utilisateur à afficher.</span>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Modifier l'utilisateur</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedUser.firstName" label="Prénom" variant="outlined" />
          <v-text-field v-model="editedUser.lastName" label="Nom" variant="outlined" />
          <v-text-field
            v-model="editedUser.email"
            label="E-mail"
            type="email"
            variant="outlined"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :disabled="isSaving" @click="dialog = false">Annuler</v-btn>
          <v-btn color="primary" :loading="isSaving" @click="saveUser">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { adminService } from '@/services/adminService';

export default {
  name: 'UserManagement',
  data() {
    return {
      dialog: false,
      headers: [
        { title: 'Prénom', key: 'firstName' },
        { title: 'Nom', key: 'lastName' },
        { title: 'Pseudo', key: 'pseudo' },
        { title: 'E-mail', key: 'email' },
        { title: 'Sexe', key: 'sexe' },
        { title: 'Rôle', key: 'role' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      users: [],
      editedUser: {},
      errorMessage: '',
      isLoading: false,
      isSaving: false,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.isLoading = true;
      try {
        const result = await adminService.getUsers();
        const users = Array.isArray(result) ? result : result && result.users;
        if (!Array.isArray(users)) {
          throw new Error('Le service utilisateurs a retourné une réponse invalide.');
        }
        this.users = users;
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = error.message || 'Impossible de charger les utilisateurs.';
        console.error('Erreur lors du chargement des utilisateurs :', error);
      } finally {
        this.isLoading = false;
      }
    },
    editUser(user) {
      this.errorMessage = '';
      this.editedUser = { ...user };
      this.dialog = true;
    },
    async deleteUser(user) {
      const uid = user && (user.uid || user.id);
      if (!uid) {
        this.errorMessage = 'Identifiant utilisateur manquant.';
        return;
      }
      if (!window.confirm(`Voulez-vous vraiment supprimer le compte de ${user.email || uid} ?`)) {
        return;
      }

      try {
        this.errorMessage = '';
        await adminService.deleteUser(uid);
        await this.fetchUsers();
      } catch (error) {
        this.errorMessage = error.message || 'Impossible de supprimer cet utilisateur.';
      }
    },
    async saveUser() {
      const email = (this.editedUser.email || '').trim();
      if (!this.editedUser.uid || !email) {
        this.errorMessage = 'Un identifiant et une adresse e-mail sont requis.';
        return;
      }

      this.isSaving = true;
      this.errorMessage = '';
      try {
        await adminService.updateUser({
          uid: this.editedUser.uid,
          firstName: this.editedUser.firstName || '',
          lastName: this.editedUser.lastName || '',
          pseudo: this.editedUser.pseudo || '',
          email,
        });
        this.dialog = false;
        await this.fetchUsers();
      } catch (error) {
        this.errorMessage = error.message || 'Impossible de modifier cet utilisateur.';
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>
