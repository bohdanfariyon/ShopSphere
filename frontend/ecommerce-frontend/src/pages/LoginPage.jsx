// pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
      <LoginForm />
    </div>
  );
};

export default  LoginPage;