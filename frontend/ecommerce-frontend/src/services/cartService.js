// services/cartService.js
import axios from '../utils/axios';
import { API_ENDPOINTS } from './api';

export const cartService = {
  getCart: async () => {
    const response = await axios.get(API_ENDPOINTS.CART);
    return response.data;
  },

  addToCart: async (productId, quantity) => {
    const response = await axios.post(
      `${API_ENDPOINTS.PRODUCTS}${productId}/add-to-cart/`,
      { product: productId, quantity }
    );
    return response.data;
  },

  updateQuantity: async (itemId, change) => {
    const response = await axios.patch(
      `${API_ENDPOINTS.CART}${itemId}/update-quantity/`,
      { change }
    );
    return response.data;
  },

  removeItem: async (itemId) => {
    return axios.delete(`${API_ENDPOINTS.CART}${itemId}/delete-item/`);
  },

  clearCart: async () => {
    return axios.delete(`${API_ENDPOINTS.CART}clear-cart/`);
  },

  placeOrder: async () => {
    const response = await axios.post(`${API_ENDPOINTS.CART}place-order/`);
    return response.data;
  },
};