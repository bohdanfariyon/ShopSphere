// components/Cart/CartItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { cartService } from '../../services/cartService';
import { fetchCart } from '../../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = async (change) => {
    await cartService.updateQuantity(item.id, change);
    dispatch(fetchCart());
  };

  const handleRemove = async () => {
    await cartService.removeItem(item.id);
    dispatch(fetchCart());
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover"
        />
        <div>
          <h3 className="font-semibold">{item.product.name}</h3>
          <p className="text-gray-600">
          ${item.product.discount > 0 && item.product.discount_type && item.product.price
            ? (item.product.discount_type === 'percentage' 
                ? (item.product.price * (1 - item.product.discount / 100)).toFixed(2)
                : (item.product.price - item.product.discount).toFixed(2)
              )
            : item.product.price
          }
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleUpdateQuantity(-1)}
          className="px-2 py-1 border rounded"
          disabled={item.quantity== 1}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => handleUpdateQuantity(1)}
          className="px-2 py-1 border rounded"
          disabled={item.product.quantity <= 0} // Деактивуємо кнопку, якщо кількість товару <= 0
        >
          +
        </button>

        <button
          onClick={handleRemove}
          className="text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;