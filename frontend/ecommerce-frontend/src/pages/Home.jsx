// pages/Home.jsx
import React, { useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/Product/ProductList';

import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productSlice';

const Home = () => {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ sort_field: 'created_at', sort_order: 'desc', limit: 6 }));
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Store
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Discover our latest products and best deals
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/products')}
          sx={{ mt: 4 }}
        >
          Browse All Products
        </Button>
      </Box>
      
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Latest Products
        </Typography>
        <ProductList products={products} />
      </Box>
    </Container>
  );
};

export default Home;