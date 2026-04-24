import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { SiWhatsapp, SiTelegram } from 'react-icons/si';

const Footer = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const telegramNumber = import.meta.env.VITE_TELEGRAM_NUMBER;
  const email = import.meta.env.VITE_EMAIL;

  return (
    <footer className="bg-contrast text-white pt-12 pb-6 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">💄 LEEMARH'S</h3>
            <p className="text-gray-300 mb-4">
              Premium wigs, bundles, closures, and hair products for every style.
            </p>
            <div className="flex gap-4">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors text-xl"
              >
                <SiWhatsapp />
              </a>
              <a
                href={`https://t.me/${telegramNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors text-xl"
              >
                <SiTelegram />
              </a>
              <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors text-xl">
                <FiInstagram />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors text-xl">
                <FiTwitter />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors text-xl">
                <FiFacebook />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiMail className="text-primary mt-1" />
                <div>
                  <p className="text-gray-300">{email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="text-primary mt-1" />
                <div>
                  <p className="text-gray-300">WhatsApp: {whatsappNumber}</p>
                  <p className="text-gray-300">Telegram: {telegramNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          {/* Payment Methods Info */}
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-primary mb-3">💳 Payment Method</h4>
            <div className="text-gray-300 space-y-2">
              <p><strong>Bank Transfer Only</strong></p>
              <p>Account Name: LAWAL HALIMOT ARIKE</p>
              <p>Account Number: 1472417725</p>
              <p>Bank Name: ACCESS BANK</p>
              <p className="mt-3 text-sm text-gray-400">
                Please include your order number in the transfer description
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2026 LEEMARH'S HAIR TREND. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
