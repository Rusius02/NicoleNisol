<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <v-data-table :headers="headers" :items="orders" item-key="id">
    
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'OrderManagement',
    data() {
      return {
        dialog: false,
        headers: [
        { text: 'Order Id', value: 'orderId' },
        { text: 'Amount', value: 'Amount' },
        { text: 'PaymentStatus', value: 'paymentStatus' },
        { text: 'UserId', value: 'userId' }
      ],
        orders: [],
        editedOrder: {},
      };
    },
    mounted() {
    this.fetchOrders();
  },
    methods: {
      async fetchOrders() {
        try {
          const apiUrl = process.env.VUE_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/Orders/GetAll`);
          this.orders = response.data;
        } catch (error) {
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
  