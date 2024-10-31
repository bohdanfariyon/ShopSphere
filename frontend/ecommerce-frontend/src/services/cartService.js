// services/cartService.js
import axios from '../utils/axios';
import { API_ROUTES } from './api';

export const cartService = {
  getCartItems: async () => {
    const response = await axios.get(API_ROUTES.CART_ITEMS);
    return response.data;
  },

  addToCart: async (productId, quantity) => {
    const response = await axios.post(
      `${API_ROUTES.PRODUCTS}${productId}/add-to-cart/`,
      { product: productId, quantity }
    );
    return response.data;
  },

  updateQuantity: async (cartItemId, change) => {
    const response = await axios.patch(
      `${API_ROUTES.CART_ITEMS}${cartItemId}/update-quantity/`,
      { change }
    );
    return response.data;
  },

  removeItem: async (cartItemId) => {
    return await axios.delete(
      `${API_ROUTES.CART_ITEMS}${cartItemId}/delete-item/`
    );
  },

  clearCart: async () => {
    return await axios.delete(API_ROUTES.CLEAR_CART);
  },

  placeOrder: async () => {
    const response = await axios.post(API_ROUTES.PLACE_ORDER);
    return response.data;
  },
};