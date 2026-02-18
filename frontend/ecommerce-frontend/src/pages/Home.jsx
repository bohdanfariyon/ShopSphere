import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage } from '../store/productSlice'; // Додали setPage
import ProductCard from '../components/Product/ProductCard';
import productService from '../services/productService';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { ArrowUpAZ, ArrowDownZA } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  // Отримуємо count та currentPage зі стору
  const { items, loading, count, currentPage } = useSelector((state) => state.products);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const pageSize = 10; // Має збігатися з page_size на бекенді

  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sort_field: '',
    sort_order: 'asc',
  });

  // Функція оновлення з урахуванням сторінки
  const updateProducts = (page = 1) => {
    const params = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});
    
    // Передаємо page в параметри запиту
    dispatch(fetchProducts({ ...params, page }));
    dispatch(setPage(page));
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await productService.getCategories();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    loadCategories();
  }, []);

  // При зміні фільтрів завжди скидаємо на 1 сторінку
  useEffect(() => {
    updateProducts(1);
  }, [dispatch, filters.category, filters.sort_field, filters.sort_order]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    updateProducts(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      updateProducts(1);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Our Products</h1>
          <div className="relative flex items-center">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                name="search"
                placeholder="Search products..."
                value={filters.search}
                onChange={handleFilterChange}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="ml-4 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filters Section (без змін) */}
        <div className={`mb-8 transition-all duration-300 ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              
              {/* Селектор категорії */}
              <div className="flex flex-col">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer text-gray-700"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Кнопка сортування */}
              <div className="flex flex-col">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Sort Order
                </label>
                <button 
                  onClick={() => setFilters(prev => ({
                    ...prev, 
                    sort_order: prev.sort_order === 'asc' ? 'desc' : 'asc'
                  }))}
                  className={`flex items-center justify-center gap-2 w-full p-2.5 border rounded-lg font-medium transition-all active:scale-[0.98] ${
                    filters.sort_order === 'asc' 
                    ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' 
                    : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  {filters.sort_order === 'asc' ? (
                    <>
                      <ArrowUpAZ className="h-5 w-5" />
                      <span>Low to High</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownZA className="h-5 w-5" />
                      <span>High to Low</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border bg-white disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-md border transition-colors ${
                        currentPage === pageNum 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border bg-white disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}

        {!loading && items.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;