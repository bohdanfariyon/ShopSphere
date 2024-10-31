// components/Cart/CartItem.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  CardMedia,
  CardContent,
  ButtonGroup,
  Button 
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeCartItem } from '../../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (change) => {
    dispatch(updateCartItemQuantity({ cartItemId: item.id, change }));
  };

  const handleRemove = () => {
    dispatch(removeCartItem(item.id));
  };

  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={item.product.image}
        alt={item.product.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">{item.product.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            ${Number(item.product.price).toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ButtonGroup size="small">
            <Button
              onClick={() => handleUpdateQuantity(-1)}
              disabled={item.quantity <= 1}
            >
              <Remove />
            </Button>
            <Button disabled>{item.quantity}</Button>
            <Button 
              onClick={() => handleUpdateQuantity(1)}
              disabled={item.quantity >= item.product.quantity}
            >
              <Add />
            </Button>
          </ButtonGroup>
          <IconButton color="error" onClick={handleRemove}>
            <Delete />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;