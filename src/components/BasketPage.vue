<template>
    <div class="basket-summary">
      <header class="page-heading">
        <p class="page-kicker">{{ $t('basket') }}</p>
        <h1 class="page-title">Vérifiez vos articles</h1>
      </header>
      <v-container>
      <v-row>
        <v-col v-for="(item, title) in uniqueItems" :key="title" cols="12" md="6" lg="4">
          <v-card class="book-card basket-book-card" elevation="0">
            <div class="card-content">
              <v-img class="book-image" :src="item.imageUrl" alt="Book Cover"></v-img>
              <div class="card-details">
                <v-card-title class="basket-book-title">
                  {{ title }} ({{ item.count }}x)
                </v-card-title>
                <v-card-text>
                  {{ item.description }}
                </v-card-text>
                <v-card-text>
                  Total: {{ item.totalPrice }}€
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="basket-divider"></v-divider>
    <div class="total-price">
      <v-card class="basket-total-card" elevation="0">
        <v-card-title>Total : {{ totalPrice }} €</v-card-title>
      </v-card>
    </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import { groupBasketItems } from '@/utils/basketHelper.js';
  
  export default {
    methods: {
      goToAddress() {
        this.$router.push('/address');
      },
    },
    computed: {
      ...mapState({
        basketItems: state => state.basket.items 
      }),
      uniqueItems() {
        const grouped = groupBasketItems(this.basketItems);
        return grouped.reduce((map, item) => {
          map[item.title] = {
            count: item.quantity,
            totalPrice: item.totalPrice,
            imageUrl: item.coverImagePath,
            description: item.description
          };
          return map;
        }, {});
      },
      totalPrice() {
        return Object.values(this.uniqueItems)
          .reduce((sum, item) => sum + item.totalPrice, 0);
      }
    },
  };
  </script>
  
<style scoped>
.basket-summary {
  min-height: 60vh;
  padding: 1rem 0 4rem;
}

.book-card {
  height: 100%;
  margin-bottom: 1.25rem;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 8px 26px rgba(58, 42, 63, 0.04);
}

.card-content {
  display: flex;
  height: 100%;
}

.book-image {
  width: 140px;
  min-width: 140px;
  height: 210px;
  margin: 1rem;
  border-radius: 12px;
  background: var(--color-lavender);
}

.card-details {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}

.basket-book-title {
  color: var(--color-plum-dark);
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  white-space: normal;
}

.basket-divider {
  margin: 1.5rem auto;
  border-color: var(--color-border);
  max-width: 1120px;
}

.total-price {
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
}

.basket-total-card {
  margin-left: auto;
  border: 1px solid var(--color-border);
  background: var(--color-lavender);
  color: var(--color-plum-dark);
  font-family: var(--font-display);
  font-size: 1.2rem;
}

@media (max-width: 540px) {
  .card-content {
    align-items: flex-start;
    flex-direction: column;
  }

  .book-image {
    width: calc(100% - 2rem);
    height: 220px;
  }
}
</style>
  