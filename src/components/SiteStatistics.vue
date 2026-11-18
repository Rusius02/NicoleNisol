<template>
    <v-card>
      <v-card-title>Statistiques du site</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
        <div v-if="!chartData.labels.length && !errorMessage">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <canvas id="siteChart" width="400" height="200"></canvas>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  import { adminService } from '@/services/adminService';
  
  // Register required components
  Chart.register(...registerables);
  
  export default {
    name: 'SiteStatistics',
    data() {
      return {
        chart: null,
        errorMessage: '',
        chartData: {
          labels: [], // Empty initially
          datasets: [
            {
              label: 'Visites',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              data: [], // Empty initially
              fill: true
            }
          ]
        },
      };
    },
    methods: {
      async fetchChartData() {
        try {
          const data = await adminService.getVisitStatistics();
  
          if (data && Array.isArray(data.labels) && Array.isArray(data.values)) {
            this.errorMessage = '';
            this.chartData.labels = data.labels;
            this.chartData.datasets[0].data = data.values;
  
            this.renderChart();
          } else {
            throw new Error('Format de statistiques Firebase invalide.');
          }
        } catch (error) {
          this.errorMessage = error.message || 'Impossible de charger les statistiques.';
          console.error('Error fetching chart data:', error);
        }
      },
      renderChart() {
        if (this.chart) {
          this.chart.destroy(); // Destroy previous chart instance if it exists
        }
  
        this.chart = new Chart(document.getElementById('siteChart'), {
          type: 'line',
          data: this.chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.dataset.label}: ${context.raw}`;
                  }
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true
              },
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    },
    mounted() {
      this.fetchChartData();
    },
    beforeUnmount() {
      if (this.chart) this.chart.destroy();
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  