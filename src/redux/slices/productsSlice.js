import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'https://fakestoreapi.com';

/**
 * fetchProducts - Async Thunk
 * ---------------------------------------------------------
 * Fetches the full list of products from FakeStore API.
 * 
 * On success:
 *    → returns array of product objects
 * On error:
 *    → rejectWithValue() returns a custom error message
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/products`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

/**
 * fetchProductById - Async Thunk
 * ---------------------------------------------------------
 * Fetches a single product based on its ID.
 *
 * On success:
 *    → returns product object
 * On error:
 *    → returns custom error message
 */
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/products/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

/**
 * Products Slice
 * ---------------------------------------------------------
 * Handles:
 * - Product list
 * - Product details
 * - Categories
 * - Loading states
 * - Error messages
 */
const productsSlice = createSlice({
  name: 'products',

  /** Initial State */
  initialState: {
    items: [],            // List of all products
    status: 'idle',       // loading | succeeded | failed
    error: null,          // error message for product list
    productDetails: null, // details for a single product
    categories: [],       // extracted unique category names
  },

  reducers: {}, // (No normal reducers for now)

  /**
   * Extra Reducers (for async thunks)
   * ---------------------------------------------------------
   * Handles pending, fulfilled, and rejected states of the
   * fetchProducts and fetchProductById thunks.
   */
  extraReducers: (builder) => {

    /** -----------------------------
     *  FETCH PRODUCTS (LIST)
     * ------------------------------*/

    builder
      // When request starts
      .addCase(fetchProducts.pending, (s) => {
        s.status = 'loading';
        s.error = null;       // Clear previous errors
      })

      // When request succeeds
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.items = a.payload;

        /**
         * Extract unique categories from the products array.
         * Example:
         * ["men's clothing", "electronics", "electronics"] → unique list.
         */
        s.categories = Array.from(new Set(a.payload.map((p) => p.category)));
      })

      // When request fails
      .addCase(fetchProducts.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.payload || 'Failed to load';
      });


    /** -----------------------------
     *  FETCH PRODUCT BY ID (DETAIL PAGE)
     * ------------------------------*/

    builder
      // Clear old details and show loader
      .addCase(fetchProductById.pending, (s) => {
        s.productDetails = null;
      })

      // When request succeeds
      .addCase(fetchProductById.fulfilled, (s, a) => {
        s.productDetails = a.payload;
      })

      // When request fails
      .addCase(fetchProductById.rejected, (s, a) => {
        s.productDetails = { error: a.payload || 'Failed to load' };
      });
  },
});

export default productsSlice.reducer;
