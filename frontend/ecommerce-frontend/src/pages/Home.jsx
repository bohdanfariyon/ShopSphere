// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/Product/ProductCard';
import productService from '../services/productService'; // Імпортуємо сервіс для отримання категорій

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  // Стан для фільтрів і сортування
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sort_field: '',
    sort_order: 'asc', // або 'desc'
  });

  // Стан для категорій
  const [categories, setCategories] = useState([]);

  // Функція для оновлення продуктів
  const updateProducts = () => {
    const params = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    dispatch(fetchProducts(params)); // передаємо фільтри
  };

  // Завантаження категорій при монтуванні компонента
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await productService.getCategories(); // Викликаємо сервіс для отримання категорій
        setCategories(response); // Зберігаємо категорії у стан
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    loadCategories();
  }, []);

  // Запускаємо оновлення продуктів при зміні категорії, поля сортування
  useEffect(() => {
    updateProducts();
  }, [dispatch, filters.category, filters.sort_field, filters.sort_order]); // Запускаємо при зміні категорії та сортування

  // Обробник змін фільтрів
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Обробник натискання клавіші для поля пошуку
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      updateProducts(); // Оновлюємо продукти при натисканні Enter в полі пошуку
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      
      {/* Форма фільтрів */}
      <div className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={filters.search}
          onChange={handleFilterChange}
          onKeyDown={handleKeyDown} // Додаємо обробник натискання клавіші
          className="border rounded p-2 mr-2"
        />
        
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border rounded p-2 mr-2"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="sort_field"
          value={filters.sort_field}
          onChange={handleFilterChange}
          className="border rounded p-2 mr-2"
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          {/* Додайте інші поля для сортування за потребою */}
        </select>

        <select
          name="sort_order"
          value={filters.sort_order}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
