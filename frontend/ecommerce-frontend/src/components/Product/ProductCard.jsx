// components/Product/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="mt-4">
        <Link to={`/product/${product.id}`} className="text-lg font-semibold">
          {product.name}
        </Link>
        <div>
  <p className="text-gray-600">
    {product.discount > 0 && product.discount_type && product.price ? (
      <>
        <del>${product.price}</del> {/* Перекреслена стара ціна */}
        <span className="ml-2">
          ${product.discount_type === 'percentage' 
            ? (product.price * (1 - product.discount / 100)).toFixed(2)
            : (product.price - product.discount).toFixed(2)
          }
        </span>
      </>
    ) : (
      <span>${product.price}</span> // Відображення звичайної ціни, якщо знижки немає
    )}
  </p>

  {product.discount > 0 && product.discount_type && (
    product.discount_type === 'percentage' ? (
      <p className="text-red-500">
        Discount: {product.discount}%
      </p>
    ) : (
      <p className="text-red-500">
        Discount: ${product.discount}
      </p>
    )
  )}
</div>


        <button
          onClick={handleAddToCart}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;