// components/Product/ProductCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" color="text.primary">
            ${Number(product.price).toFixed(2)}
          </Typography>
          {product.discount > 0 && (
            <Typography variant="body2" color="error">
              {product.discount}% OFF
            </Typography>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Category: {product.category.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate(`/products/${product.id}`)}
            fullWidth
          >
            Details
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddToCart}
            fullWidth
            disabled={product.quantity === 0}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;