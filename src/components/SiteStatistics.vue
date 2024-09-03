<template>
    <v-card>
      <v-card-title>Statistiques du site</v-card-title>
      <v-card-text>
        <div v-if="!chartData.labels.length">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <canvas id="siteChart" width="400" height="200"></canvas>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  // Register required components
  Chart.register(...registerables);
  
  export default {
    name: 'SiteStatistics',
    data() {
      return {
        chart: null,
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
          // Simulated data fetch
          const data = await this.simulateDataFetch();
  
          if (data && Array.isArray(data.labels) && Array.isArray(data.values)) {
            this.chartData.labels = data.labels;
            this.chartData.datasets[0].data = data.values;
  
            this.renderChart();
          } else {
            console.error('Invalid data format:', data);
          }
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      },
      simulateDataFetch() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              values: [30, 20, 50, 40, 60, 70, 90]
            });
          }, 1000);
        });
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
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  