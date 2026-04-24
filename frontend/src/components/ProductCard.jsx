import React from 'react';
import { FiStar } from 'react-icons/fi';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            size={16}
            className={i < rating ? 'fill-accent text-accent' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Container */}
      <div
        className="relative overflow-hidden bg-gray-200 h-64 cursor-pointer group"
        onClick={onViewDetails}
      >
        <img
          src={product.image || 'https://via.placeholder.com/300x400?text=Product'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        {product.discount && (
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3
          className="font-bold text-lg text-contrast mb-2 line-clamp-2 cursor-pointer hover:text-primary"
          onClick={onViewDetails}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          {renderStars(product.rating || 4)}
          <span className="text-gray-600 text-sm">({product.reviews || 0})</span>
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2 mb-3">
            {product.colors.slice(0, 3).map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: getColorValue(color) }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-600 flex items-center">+{product.colors.length - 3}</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="block text-sm text-gray-500 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onAddToCart}
          className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300 transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const getColorValue = (colorName) => {
  const colors = {
    black: '#000000',
    wine: '#722f37',
    gold: '#FFD700',
    brown: '#8B4513',
  };
  return colors[colorName.toLowerCase()] || '#cccccc';
};

export default ProductCard;
