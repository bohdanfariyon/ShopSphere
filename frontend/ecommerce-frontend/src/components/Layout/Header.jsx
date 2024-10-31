// components/Layout/Header.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token'); // Видалити токен при виході
  };

  // Перевірка токена при монтуванні компонента
  useEffect(() => {
    const token = localStorage.getItem('token'); // Перевірка наявності токена
    if (token) {
      // Якщо токен є, можете також додати логіку для отримання даних про користувача
      // dispatch(fetchUserData(token)); // Ваша функція для отримання даних
    }
  }, [dispatch]);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Shop
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="hover:text-blue-500">
              Cart ({items.length})
            </Link>
            {user || localStorage.getItem('token') ? ( // Перевірка чи є користувач або токен
              <>
                
                <Link to="/profile">Profile</Link>
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
