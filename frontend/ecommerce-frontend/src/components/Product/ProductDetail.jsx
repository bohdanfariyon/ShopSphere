// components/Product/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../../store/productSlice';
import { addToCart } from '../../store/cartSlice';
import ProductReview from './ProductReview';
import productService from '../../services/productService'; // Імпортуємо сервіс для відправлення відгуків

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5]; // Створюємо масив з 1, 2, 3, 4, 5

  return (
    <div className="flex">
      {stars.map((star) => (
        <button
          key={star}
          className={`text-${star <= rating ? 'yellow' : 'gray'}-500 text-2xl`}
          onClick={() => onRatingChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  // Стан для відгуку
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, quantity }));
  };

  // Функція для обробки відправлення відгуку
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await productService.addReview(id, { rating, comment });
      // Оновлення продуктів або додавання нового відгуку в стан
      dispatch(fetchProductDetails(id)); // Завантажуємо деталі продукту знову, щоб отримати новий відгук
      setRating(0); // Скидаємо рейтинг
      setComment(''); // Скидаємо коментар
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading || !selectedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
          <div>
            <p className="text-gray-600">
              {selectedProduct.discount > 0 && selectedProduct.discount_type && selectedProduct.price ? (
                <>
                  <del>${selectedProduct.price}</del> {/* Перекреслена стара ціна */}
                  <span className="ml-2">
                    ${selectedProduct.discount_type === 'percentage' 
                      ? (selectedProduct.price * (1 - selectedProduct.discount / 100)).toFixed(2)
                      : (selectedProduct.price - selectedProduct.discount).toFixed(2)
                    }
                  </span>
                </>
              ) : (
                <span>${selectedProduct.price}</span> // Відображення звичайної ціни, якщо знижки немає
              )}
            </p>

            {selectedProduct.discount > 0 && selectedProduct.discount_type && (
              selectedProduct.discount_type === 'percentage' ? (
                <p className="text-red-500">
                  Discount: {selectedProduct.discount}%
                </p>
              ) : (
                <p className="text-red-500">
                  Discount: ${selectedProduct.discount}
                </p>
              )
            )}
          </div>
          <p className="mb-6">{selectedProduct.description}</p>
          <div className="flex items-center gap-4 mb-6">
          <input
  type="number"
  min="1"
  value={quantity}
  onChange={(e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity >= 1 && newQuantity <= selectedProduct.quantity) {
      setQuantity(newQuantity);
    } else if (newQuantity < 1) {
      setQuantity(1); // Щоб не було негативних або нульових значень
    }
  }}
  className="border rounded px-3 py-2 w-20"
/>


            <button
              onClick={handleAddToCart}
              className={`mt-2 bg-blue-500 text-white px-4 py-2 rounded ${selectedProduct.quantity <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedProduct.quantity <= 0}
            >
              Add to Cart
            </button>

          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        {selectedProduct.reviews.map((review) => (
          <ProductReview key={review.id} review={review} />
        ))}
      </div>

      {/* Форма для написання відгуку */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
        <form onSubmit={handleSubmitReview} className="mb-4">
          <div className="mb-4">
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          <div className="mb-4">
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="border rounded w-full p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
