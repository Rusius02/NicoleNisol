<template>
    <v-container>
      <v-row>
        <!-- Statistiques des visites -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Visites du site</v-card-title>
            <v-card-text>
              <line-chart :chart-data="visitsData" />
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Statistiques des ventes -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Livres vendus</v-card-title>
            <v-card-text>
              <bar-chart :chart-data="salesData" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { Line, Bar } from 'vue-chartjs';
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    name: 'SiteStatistics',
    components: {
      LineChart: {
        extends: Line,
        props: ['chartData'],
        mounted() {
          this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
        },
      },
      BarChart: {
        extends: Bar,
        props: ['chartData'],
        mounted() {
          this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
        },
      },
    },
    data() {
      return {
        visitsData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Visites',
              backgroundColor: '#42A5F5',
              data: [500, 600, 800, 700, 900, 1200, 1500, 2000, 1800, 1600, 1400, 1300],
            },
          ],
        },
        salesData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Livres vendus',
              backgroundColor: '#66BB6A',
              data: [20, 30, 50, 40, 60, 80, 90, 120, 110, 100, 90, 85],
            },
          ],
        },
      };
    },
  };
  </script>
  
  <style scoped>
  /* Custom styling for your charts and cards */
  .v-card {
    min-height: 300px;
  }
  </style>
  