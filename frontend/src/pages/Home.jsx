import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

const Home = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Show first 6 products as featured
    setFeaturedProducts(PRODUCTS.slice(0, 6));
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Chioma Okafor',
      text: 'The quality is amazing! My hair looks so natural and beautiful.',
      rating: 5,
      image: '👩‍🦱',
    },
    {
      id: 2,
      name: 'Zainab Hassan',
      text: 'Best customer service ever. Delivery was fast and packaging was perfect!',
      rating: 5,
      image: '👩‍🦳',
    },
    {
      id: 3,
      name: 'Amara Eze',
      text: 'Worth every penny! I get compliments everywhere I go.',
      rating: 5,
      image: '👩',
    },
    {
      id: 4,
      name: 'Blessing Adeyemi',
      text: 'The pixie curls wig is my favorite! Very comfortable to wear.',
      rating: 5,
      image: '👩‍🦱',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen md:h-[600px] bg-gradient-to-r from-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
              Premium Hair That Turns Heads
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-slideUp">
              Discover our exclusive collection of wigs, bundles, closures, and hair products.
              Elevate your style with LEEMARH'S HAIR TREND.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                to="/products"
                className="bg-white text-primary font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                Shop Now <FiArrowRight />
              </Link>
              <a
                href="#featured"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping across Nigeria</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">100% human and synthetic hair products</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">WhatsApp, Telegram, and Email support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-contrast">Featured Collection</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Handpicked selection of our most popular wigs and hair products
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
                onViewDetails={() => (window.location.href = `/products/${product.id}`)}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-block bg-primary text-white font-bold py-4 px-12 rounded-lg hover:bg-primary-dark transition-all transform hover:scale-105"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-contrast">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Wigs', 'Bundles', 'Closures', 'Accessories'].map((category, idx) => (
              <Link
                key={idx}
                to={`/products?category=${category.toLowerCase()}`}
                className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer group"
              >
                <div className="text-4xl mb-4">
                  {idx === 0 && '💁‍♀️'}
                  {idx === 1 && '✨'}
                  {idx === 2 && '👑'}
                  {idx === 3 && '💍'}
                </div>
                <h3 className="text-xl font-bold text-primary group-hover:text-primary-dark">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-contrast">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-bold text-contrast">{testimonial.name}</p>
                    <div className="flex text-accent">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">\"{}\"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Look?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our complete collection and find the perfect wig or hair product for you.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-primary font-bold py-4 px-12 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
