<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
              <v-data-table :headers="headers" :items="orders" item-value="id">
    
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { adminService } from '@/services/adminService';

  export default {
    name: 'OrderManagement',
    data() {
      return {
        dialog: false,
        headers: [
        { title: 'Commande', key: 'id' },
        { title: 'Montant (centimes)', key: 'amount' },
        { title: 'État du paiement', key: 'paymentStatus' },
        { title: 'Utilisateur', key: 'userId' }
      ],
        orders: [],
        errorMessage: '',
        editedOrder: {},
      };
    },
    mounted() {
    this.fetchOrders();
  },
    methods: {
      async fetchOrders() {
        try {
          const result = await adminService.getOrders();
          this.orders = Array.isArray(result) ? result : result.orders;
          this.errorMessage = '';
        } catch (error) {
          this.errorMessage = error.message || 'Impossible de charger les commandes.';
          console.error('Error fetching orders:', error);
        }
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
  