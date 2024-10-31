// store/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../services/cartService';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCartItems();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(productId, quantity);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ cartItemId, change }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateQuantity(cartItemId, change);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async (cartItemId, { rejectWithValue }) => {
    try {
      await cartService.removeItem(cartItemId);
      return cartItemId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Додайте нові функції clearCart і placeOrder
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await cartService.clearCart();
      return []; // Повертаємо порожній масив
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await cartService.placeOrder(orderData);
      return response; // Повертаємо дані замовлення
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = []; // Очищуємо кошик
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        // Можливо, додайте обробку стану замовлення тут
      });
  },
});

export default cartSlice.reducer;
