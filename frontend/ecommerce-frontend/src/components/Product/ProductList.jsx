// src/components/Product/ProductList.jsx
import React from 'react';
import { Grid, TextField, MenuItem, Box } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ products, onSort, onFilter, onSearch }) => {
  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => onSearch(e.target.value)}
          size="small"
        />
        <TextField
          select
          label="Sort by"
          onChange={(e) => onSort(e.target.value)}
          size="small"
          defaultValue=""
        >
          <MenuItem value="price_asc">Price: Low to High</MenuItem>
          <MenuItem value="price_desc">Price: High to Low</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </TextField>
        <TextField
          select
          label="Category"
          onChange={(e) => onFilter(e.target.value)}
          size="small"
          defaultValue=""
        >
          <MenuItem value="">All</MenuItem>
          {/* Add categories dynamically */}
        </TextField>
      </Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;