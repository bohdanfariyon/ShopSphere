// pages/CartPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  CircularProgress 
} from '@mui/material';
import CartList from '../components/Cart/CartList';
import { fetchCartItems } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartItems());
    } else {
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {items.length === 0 ? (
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <CartList items={items} />
      )}
    </Container>
  );
};

export default CartPage;