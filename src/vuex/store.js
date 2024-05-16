import { createStore } from 'vuex';

const store = createStore({
  state: {
    basket: {
      items: [] // Initial basket items
    }
  },
  mutations: {
    // Mutation to add an item to the basket
    addToBasket(state, item) {
      state.basket.items.push(item);
    },
    // Mutation to remove an item from the basket
    removeFromBasket(state, index) {
      state.basket.items.splice(index, 1);
    }
    // Add more mutations as needed
  }
});

export default store;
