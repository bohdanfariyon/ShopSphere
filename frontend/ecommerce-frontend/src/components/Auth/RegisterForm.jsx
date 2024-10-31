// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { register } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone_number: '',
    address: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(formData)).unwrap();
      navigate('/');
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      {error && (
        <Typography color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Phone Number"
        name="phone_number"
        type="tel"
        value={formData.phone_number}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        margin="normal"
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
