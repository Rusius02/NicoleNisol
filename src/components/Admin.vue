<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="2">
          <!-- Sidebar with navigation links -->
          <v-navigation-drawer app permanent>
            <v-list dense>
              <v-list-item-group
                v-model="selectedItem"
                active-class="primary--text"
              >
                <v-list-item @click="changePage(0)">
                  <v-list-item-icon>
                    <v-icon>mdi-book</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Gestion des livres</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item @click="changePage(1)">
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Ateliers d'écriture</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item @click="changePage(2)">
                  <v-list-item-icon>
                    <v-icon>mdi-chart-bar</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Statistiques du site</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item @click="changePage(3)">
                  <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Gestion des utilisateurs</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </v-col>
  
        <v-col cols="12" md="9">
          <!-- Main content -->
          <v-card v-if="selectedItem === 0" class="pa-4">
            <h2>Gestion des livres</h2>
            <BookManagement />
          </v-card>
  
          <v-card v-else-if="selectedItem === 1" class="pa-4">
            <h2>Gestion des ateliers d'écriture</h2>
            <WorkshopManagement />
          </v-card>
  
          <v-card v-else-if="selectedItem === 2" class="pa-4">
            <h2>Statistiques du site</h2>
            <SiteStatistics />
          </v-card>
  
          <v-card v-else-if="selectedItem === 3" class="pa-4">
            <h2>Gestion des utilisateurs</h2>
            <UserManagement />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  
  <script>
import BookManagement from "@/components/BookManagement.vue";
import WorkshopManagement from "@/components/WorkshopManagement.vue";
import SiteStatistics from "@/components/SiteStatistics.vue";
import UserManagement from "@/components/UserManagement.vue";

export default {
  name: "ManagePage",
  components: {
    BookManagement,
    WorkshopManagement,
    SiteStatistics,
    UserManagement,
  },
  data() {
    return {
      selectedItem: 0, // Default to "Gestion des livres"
    };
  },
  methods: {
    // Method to change page
    changePage(pageIndex) {
      this.selectedItem = pageIndex;
    },
  },
};
</script>

  <style scoped>
  /* Add custom styles here */
  </style>
  