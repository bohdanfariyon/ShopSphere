// components/Product/ProductReview.jsx
import React from 'react';
import { Box, Typography, Rating, Paper } from '@mui/material';

const ProductReview = ({ review }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Rating value={review.rating} readOnly />
        <Typography variant="body2" color="text.secondary">
          {new Date(review.created_at).toLocaleDateString()}
        </Typography>
      </Box>
      <Typography variant="body1">
        {review.comment}
      </Typography>
    </Paper>
  );
};

export default ProductReview;