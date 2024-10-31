// components/Cart/CartList.jsx
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../store/cartSlice';
import CartItem from './CartItem';
import { cartService } from '../../services/cartService';

const CartList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  const handleClearCart = async () => {
    await cartService.clearCart();
    dispatch(fetchCart());
  };

  const handlePlaceOrder = async () => {
    await cartService.placeOrder();
    dispatch(fetchCart());
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      {items.length === 0 ? (
        <p className="text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl">${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleClearCart}
                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;