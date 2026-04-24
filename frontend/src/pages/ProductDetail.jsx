import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiCheck, FiTruck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = PRODUCTS.find((p) => p.id === parseInt(id));
      setProduct(foundProduct || null);
      if (foundProduct?.colors) {
        setSelectedColor(foundProduct.colors[0]);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-600">Product not found</h2>
        <Link to="/products" className="text-primary hover:text-primary-dark mt-4">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    alert(`${quantity}x ${product.name} added to cart!`);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-8"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center">
              <img
                src={product.image || 'https://via.placeholder.com/500x600'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg h-20 flex items-center justify-center cursor-pointer hover:border-2 hover:border-primary"
                >
                  <img
                    src={product.image || 'https://via.placeholder.com/100'}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                In Stock
              </span>
            </div>

            <h1 className="text-4xl font-bold text-contrast mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">
                    {i < (product.rating || 4) ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-600">({product.reviews || 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-primary">
                ₦{product.price.toLocaleString()}
              </p>
              {product.originalPrice && (
                <p className="text-lg text-gray-500 line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description ||
                  'Premium quality wig made from 100% human hair. Perfect for any occasion and suitable for all hair types. Comfortable to wear and easy to maintain.'}
              </p>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Available Colors</h3>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        selectedColor === color
                          ? 'border-primary scale-110'
                          : 'border-gray-300'
                      }`}
                      style={{
                        backgroundColor: {
                          black: '#000000',
                          wine: '#722f37',
                          gold: '#FFD700',
                          brown: '#8B4513',
                        }[color],
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">Quantity</h3>
              <div className="flex items-center border-2 border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="border-none w-12 text-center outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary-dark transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FiCheck size={24} /> Add to Cart
              </button>
              <button className="px-6 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                <FiHeart size={24} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="font-bold text-lg mb-4">Shipping & Returns</h3>
              <div className="flex gap-4">
                <FiTruck className="text-primary text-2xl flex-shrink-0" />
                <div>
                  <p className="font-semibold">Fast Delivery</p>
                  <p className="text-gray-600 text-sm">Shipped within 24 hours across Nigeria</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FiCheck className="text-primary text-2xl flex-shrink-0" />
                <div>
                  <p className="font-semibold">Money-Back Guarantee</p>
                  <p className="text-gray-600 text-sm">14 days return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PRODUCTS.filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm line-clamp-2">{relatedProduct.name}</p>
                    <p className="text-primary font-bold mt-2">
                      ₦{relatedProduct.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
