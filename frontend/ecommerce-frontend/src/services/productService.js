// services/productService.js
import axios from '../utils/axios';
import { API_ROUTES } from './api';

export const productService = {
  getProducts: async (params) => {
    const response = await axios.get(API_ROUTES.PRODUCTS, { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await axios.get(`${API_ROUTES.PRODUCTS}${id}/`);
    return response.data;
  },

  addProductReview: async (productId, reviewData) => {
    const response = await axios.post(
      `${API_ROUTES.PRODUCTS}${productId}/add-feedback/`,
      reviewData
    );
    return response.data;
  },
};