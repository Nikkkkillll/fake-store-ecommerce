import { createSlice } from '@reduxjs/toolkit';

/**
 * Cart Slice
 * ---------------------------------------------------------
 * This slice manages the shopping cart state.
 *
 * State structure:
 * {
 *    items: {
 *       "1": { product: {...}, qty: 2 },
 *       "5": { product: {...}, qty: 1 },
 *       ...
 *    }
 * }
 *
 * items = an object keyed by product ID.
 * This makes:
 * - Adding items fast
 * - Updating qty fast
 * - Removing items easy
 */

const cartSlice = createSlice({
  name: 'cart',

  // Initial cart state
  initialState: {
    items: {} // id -> { product, qty }
  },

  reducers: {

    /**
     * addToCart
     * ---------------------------------------------------------
     * Triggered when user clicks “Add to Cart”.
     *
     * If product already exists in cart:
     *   → increase quantity
     *
     * If product is new:
     *   → add it with qty = 1
     */
    addToCart: (state, action) => {
      const product = action.payload;   // full product object
      const id = product.id;            // product ID

      // If already exists, increase quantity
      if (state.items[id]) {
        state.items[id].qty += 1;
      } 
      // Otherwise add new item with qty=1
      else {
        state.items[id] = { product, qty: 1 };
      }
    },

    /**
     * removeFromCart
     * ---------------------------------------------------------
     * Removes an item completely from the cart.
     * action.payload = product ID to remove
     */
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },

    /**
     * setQuantity
     * ---------------------------------------------------------
     * Updates quantity of a specific cart item.
     *
     * action.payload = { id, qty }
     *
     * Math.max(1, qty) ensures qty never goes below 1.
     */
    setQuantity: (state, action) => {
      const { id, qty } = action.payload;
      if (state.items[id]) {
        state.items[id].qty = Math.max(1, qty);
      }
    },

    /**
     * clearCart
     * ---------------------------------------------------------
     * Removes *all* items from the cart.
     * Used for: "Clear Cart" button, after checkout, etc.
     */
    clearCart: (state) => {
      state.items = {};
    },
  },
});

// Export actions to be used in components
export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;

// Export reducer to be added into Redux store
export default cartSlice.reducer;
