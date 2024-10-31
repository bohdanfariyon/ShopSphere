// components/Layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Shop
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-500">
              Products
            </Link>
            <Link to="/cart" className="hover:text-blue-500">
              Cart ({items.length})
            </Link>
            {user ? (
              <>
                <span>{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="hover:text-blue-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-500">
                  Login
                </Link>
                <Link to="/register" className="hover:text-blue-500">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;