// components/Product/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../../store/productSlice';
import { addToCart } from '../../store/cartSlice';
import ProductReview from './ProductReview';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, quantity }));
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
          <p className="text-xl mb-4">${selectedProduct.price}</p>
          {selectedProduct.discount > 0 && (
            <p className="text-red-500 mb-4">
              Discount: {selectedProduct.discount}%
            </p>
          )}
          <p className="mb-6">{selectedProduct.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-3 py-2 w-20"
            />
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
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
    </div>
  );
};

export default ProductDetail;