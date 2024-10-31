// components/Product/ProductDetail.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper,
  Rating,
  Divider 
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import ProductReview from './ProductReview';

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" color="primary" component="span">
              ${Number(product.price).toFixed(2)}
            </Typography>
            {product.discount > 0 && (
              <Typography 
                variant="body1" 
                color="error" 
                component="span" 
                sx={{ ml: 2 }}
              >
                {product.discount}% OFF
              </Typography>
            )}
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Category: {product.category.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Available: {product.quantity} units
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            fullWidth
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      <Box>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        {product.reviews.map((review) => (
          <ProductReview key={review.id} review={review} />
        ))}
      </Box>
    </Paper>
  );
};

export default ProductDetail;