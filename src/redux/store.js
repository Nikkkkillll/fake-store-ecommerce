import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';

/**
 * loadCartFromLocalStorage()
 * -------------------------------------------
 * Loads the saved cart state from localStorage.
 * If nothing is saved, returns undefined so Redux
 * can use its default initial state.
 */
function loadCartFromLocalStorage() {
  try {
    const saved = localStorage.getItem("cartState");
    return saved ? JSON.parse(saved) : undefined;
  } catch (err) {
    console.error("Error loading cart:", err);
    return undefined;
  }
}

/**
 * Redux Store Configuration
 * -------------------------------------------
 * - Combines all reducers (products + cart)
 * - Uses preloadedState to restore the cart from localStorage
 * - Enables browser Redux DevTools automatically
 */
const store = configureStore({
  reducer: {
    products: productsReducer,   // Handles product list, product details
    cart: cartReducer,           // Handles cart items + actions
  },

  /**
   * preloadedState
   * -------------------------------------------
   * This loads initial cart state from localStorage.
   * If nothing is stored yet, fallback defaults to:
   * { items: {} }
   */
  preloadedState: {
    cart: loadCartFromLocalStorage() || { items: {} }
  }
});

/**
 * Save Cart to LocalStorage
 * -------------------------------------------
 * Every time the Redux store updates, this subscriber runs.
 * It extracts the cart slice and saves it to localStorage.
 *
 * This ensures:
 * - Cart items persist after page refresh
 * - Cart updates are always synced with localStorage
 */
store.subscribe(() => {
  try {
    const state = store.getState();  // get full Redux state
    localStorage.setItem(
      "cartState",
      JSON.stringify(state.cart)     // save only the cart slice
    );
  } catch (err) {
    console.error("Error saving cart:", err);
  }
});

export default store;
