import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors"
          >
            💄 LEEMARH'S
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search wigs, bundles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary-dark"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/products"
              className="text-gray-700 hover:text-primary transition-colors font-semibold"
            >
              Shop
            </Link>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-primary transition-colors font-semibold"
            >
              Reviews
            </a>

            {/* Wishlist */}
            <Link
              to="#"
              className="relative text-gray-700 hover:text-primary transition-colors"
            >
              <FiHeart size={24} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-primary transition-colors"
            >
              <FiShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="#"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark"
                >
                  <FiSearch />
                </button>
              </div>
            </form>

            <Link
              to="/products"
              className="block py-2 text-gray-700 hover:text-primary font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <a
              href="#testimonials"
              className="block py-2 text-gray-700 hover:text-primary font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Reviews
            </a>
            <Link
              to="/cart"
              className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary font-semibold"
              onClick={() => setIsOpen(false)}
            >
              <FiShoppingCart /> Cart ({getTotalItems()})
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left py-2 text-primary font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                to="#"
                className="block py-2 text-primary font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
