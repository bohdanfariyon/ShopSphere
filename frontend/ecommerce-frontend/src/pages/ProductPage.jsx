// pages/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, CircularProgress, Box } from '@mui/material';
import ProductList from '../components/Product/ProductList';
import { fetchProducts } from '../store/productSlice';
import Typography from '@mui/material/Typography'; // Adjust this if using a different library

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [filters, setFilters] = useState({
    search: '',
    sort_field: '',
    sort_order: '',
    category: '',
  });

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleSort = (sortValue) => {
    const [field, order] = sortValue.split('_');
    setFilters(prev => ({
      ...prev,
      sort_field: field,
      sort_order: order || 'asc'
    }));
  };

  const handleFilter = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

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
      <ProductList
        products={products}
        onSearch={handleSearch}
        onSort={handleSort}
        onFilter={handleFilter}
      />
    </Container>
  );
};

export default ProductPage;