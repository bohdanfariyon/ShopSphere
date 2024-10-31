// pages/CartPage.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../store/cartSlice';
import CartList from '../components/Cart/CartList';

const CartPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <CartList />
    </div>
  );
};

export default CartPage;