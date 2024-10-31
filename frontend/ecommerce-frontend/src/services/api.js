// services/api.js
import axios from '../utils/axios';

export const API_ROUTES = {
  LOGIN: '/user/token/',
  REGISTER: '/user/create/',
  USER_PROFILE: '/user/me/',
  PRODUCTS: '/product/products/',
  CART_ITEMS: '/product/cartitems/',
  PLACE_ORDER: '/product/cartitems/place-order/',
  CLEAR_CART: '/product/cartitems/clear-cart/',
};