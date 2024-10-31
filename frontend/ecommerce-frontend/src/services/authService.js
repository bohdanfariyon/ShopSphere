// services/authService.js
import axios from '../utils/axios';
import { API_ROUTES } from './api';

export const authService = {
  login: async (credentials) => {
    const response = await axios.post(API_ROUTES.LOGIN, credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(API_ROUTES.REGISTER, userData);
    return response.data;
  },

  getUserProfile: async () => {
    const response = await axios.get(API_ROUTES.USER_PROFILE);
    return response.data;
  },

  updateUserProfile: async (userData) => {
    const response = await axios.patch(API_ROUTES.USER_PROFILE, userData);
    return response.data;
  },
};