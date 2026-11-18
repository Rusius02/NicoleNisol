<template>
  <article class="book-tile">
    <v-card class="book-card" elevation="0">
      <div class="book-cover">
        <v-img
          class="book-image"
          :src="coverImagePath || defaultFallbackImage"
          :alt="`Couverture de ${title || 'livre'}`"
          cover
        >
          <template #placeholder>
            <div class="cover-placeholder">
              <v-progress-circular indeterminate color="primary" />
            </div>
          </template>
        </v-img>
      </div>

      <div class="book-details">
        <p class="book-eyebrow">Nicole Nisol</p>
        <v-card-title class="book-title">{{ title }}</v-card-title>
        <v-card-text class="book-description">{{ description }}</v-card-text>
        <div class="book-purchase">
          <p class="book-price">{{ price }} <span>€</span></p>
          <v-btn class="buy-button" color="primary" @click="addToBasket">
            {{ $t('add_to_basket') }}
            <v-icon end>mdi-arrow-up-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </article>
</template>

<script>
export default {
  name: 'BookItem',
  props: {
    title: String,
    description: String,
    coverImagePath: String,
    linkBuy: String,
    price: [Number, String],
    priceIDFromStripe: String,
    isLeftAligned: Boolean,
    elevation: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      defaultFallbackImage: 'https://placehold.co/480x720/eee8f1/684f70?text=Nicole+Nisol'
    };
  },
  methods: {
    addToBasket() {
      if (this.linkBuy) {
        window.open(this.linkBuy, '_blank', 'noopener,noreferrer');
      } else {
        console.error("Le lien d'achat (linkBuy) n'est pas défini.");
      }
    }
  }
};
</script>

<style scoped>
.book-tile {
  min-width: 0;
}

.book-card {
  display: grid;
  height: 100%;
  overflow: hidden;
  grid-template-columns: minmax(120px, 0.72fr) minmax(0, 1fr);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 8px 26px rgba(58, 42, 63, 0.04);
  transition: box-shadow 220ms ease, transform 220ms ease;
}

.book-card:hover {
  box-shadow: var(--shadow-soft);
  transform: translateY(-4px);
}

.book-cover {
  min-height: 290px;
  overflow: hidden;
  background: var(--color-lavender);
}

.book-image {
  height: 100%;
  min-height: 290px;
  transition: transform 300ms ease;
}

.book-card:hover .book-image {
  transform: scale(1.035);
}

.cover-placeholder {
  display: grid;
  height: 100%;
  min-height: 290px;
  place-items: center;
}

.book-details {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(1rem, 2vw, 1.6rem);
}

.book-eyebrow {
  margin: 0;
  color: var(--color-sage);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.book-title {
  padding: 0.55rem 0 0;
  color: var(--color-plum-dark);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600;
  line-height: 1.05;
  white-space: normal;
}

.book-description {
  display: -webkit-box;
  overflow: hidden;
  padding: 0.65rem 0 0;
  color: var(--color-muted);
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}

.book-purchase {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
}

.book-price {
  margin: 0;
  color: var(--color-plum-dark);
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 600;
}

.book-price span {
  font-family: var(--font-body);
  font-size: 0.9rem;
}

.buy-button {
  border-radius: 999px;
  font-size: 0.82rem;
}

@media (max-width: 480px) {
  .book-card {
    grid-template-columns: minmax(100px, 0.65fr) minmax(0, 1fr);
  }

  .book-cover,
  .book-image,
  .cover-placeholder {
    min-height: 250px;
  }

  .book-purchase {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
