import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(PRODUCTS);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      if (
        selectedColors.length > 0 &&
        !selectedColors.some((color) => product.colors.includes(color))
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
        default:
          return b.id - a.id;
      }
    });

  const handleColorToggle = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    // Show toast notification
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Our Collection</h1>
          <p className="text-gray-100">Discover our complete range of premium wigs and hair products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-contrast">Filter</h3>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-700 mb-4">Category</h4>
                <div className="space-y-2">
                  {['all', 'wigs', 'bundles', 'closures'].map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 w-4 h-4"
                      />
                      <span className="capitalize text-gray-700">{
                        cat === 'all' ? 'All Products' : cat
                      }</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-700 mb-4">Color</h4>
                <div className="space-y-2">
                  {['black', 'wine', 'gold', 'brown'].map((color) => (
                    <label key={color} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => handleColorToggle(color)}
                        className="mr-2 w-4 h-4"
                      />
                      <div
                        className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                        style={{
                          backgroundColor: {
                            black: '#000000',
                            wine: '#722f37',
                            gold: '#FFD700',
                            brown: '#8B4513',
                          }[color],
                        }}
                      />
                      <span className="capitalize text-gray-700">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-700 mb-4">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600">
                    ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedColors([]);
                  setPriceRange([0, 100000]);
                }}
                className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-contrast">Products</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FiFilter /> Filter
              </button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-gray-50 p-4 rounded-lg mb-6">
                {/* Filter content here (same as desktop) */}
                <button
                  onClick={() => setShowFilters(false)}
                  className="float-right text-2xl"
                >
                  <FiX />
                </button>
              </div>
            )}

            {/* Sort and Results */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

            {/* Products Grid */}
            {loading ? (
              <LoadingSpinner />
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onViewDetails={() => (window.location.href = `/products/${product.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-2xl text-gray-600 mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedColors([]);
                    setPriceRange([0, 100000]);
                  }}
                  className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
