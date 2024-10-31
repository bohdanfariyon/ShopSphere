// components/Cart/CartList.jsx
import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';

const CartList = ({ items }) => {
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.quantity * Number(item.product.price));
    }, 0);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Shopping Cart</Typography>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={handleClearCart}
          disabled={items.length === 0}
        >
          Clear Cart
        </Button>
      </Box>
      
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography>
      </Box>
    </Box>
  );
};

export default CartList;