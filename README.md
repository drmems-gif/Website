# LEEMARH'S HAIR TREND - E-Commerce Platform

A modern, production-ready e-commerce website for a premium hair business selling wigs, bundles, closures, and hair products.

## 🎨 Brand Overview

**Business:** LEEMARH'S HAIR TREND
**Services:** High-quality wigs, hair bundles, closures, and hair care products
**Design:** Luxurious, modern, mobile-first responsive design

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS
- **State Management:** Context API / Redux (optional)
- **HTTP Client:** Axios
- **Icons:** React Icons

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Validation:** Joi
- **Authentication:** JWT

### Deployment
- **Frontend:** Vercel / Netlify
- **Backend:** Railway / Render
- **Database:** MongoDB Atlas

## 📁 Project Structure

```
leemarhs-hair-trend/
├── frontend/                 # React Vite application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── context/          # Context API (cart, auth, etc.)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API services
│   │   ├── styles/           # Global CSS
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/               # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/                  # Express.js application
│   ├── src/
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── config/           # Configuration files
│   │   ├── utils/            # Utility functions
│   │   └── server.js         # Entry point
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Features

### Frontend
✅ Responsive Design (Mobile, Tablet, Desktop)
✅ Sticky Navigation Bar
✅ Hero Section with CTA
✅ Product Categories & Grid
✅ Product Detail Pages
✅ Shopping Cart Management
✅ Wishlist Feature
✅ Checkout Flow
✅ Order Tracking
✅ Testimonials Section
✅ WhatsApp Chat Integration
✅ Promo Code Support
✅ Smooth Animations

### Backend
✅ RESTful API
✅ Product Management (CRUD)
✅ Order Management
✅ User Authentication
✅ Order Processing
✅ Payment Integration Ready (Bank Transfer)
✅ Admin Dashboard Ready

## 🎨 Color Theme

- **Hot Pink (Primary):** #FF2E93
- **Deep Pink (Hover/Secondary):** #D81B60
- **Pure White (Base):** #FFFFFF
- **Jet Black (Contrast):** #000000
- **Rich Gold (Accent):** #FFD700

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🔧 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (Atlas or Local)

### Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Run Both
```bash
npm run dev
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
API_URL=http://localhost:5000
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME="LEEMARH'S HAIR TREND"
```

## 💳 Payment Integration

**Bank Transfer Details:**
- Account Number: 1472417725
- Account Name: LAWAL HALIMOT ARIKE
- Bank Name: ACCESS BANK

**Contact Methods:**
- WhatsApp: 07055706867
- Telegram: 08085185151
- Email: halimotlawal5@gmail.com

## 📦 Product Catalog (10 Items)

1. **Pixie Curls (Fringe & Frontal)** - ₦20,000
2. **Full Frontal Bone Straight** - ₦40,000
3. **Full Frontal Blend Bounce Wig** - ₦45,000
4. **Long Pixie Curls** - ₦40,000
5. **Glueless Full Frontal Student Bob** - ₦20,000
6. **100% Human Hair Pixie Cut Wig** - ₦20,000
7. **Full Frontal HD Lace Factory Yaki Straight** - ₦30,000
8. **Glueless Tiwa Wig** - ₦35,000
9. **Full Frontal Body Wave** - ₦60,000
10. **Glueless Celebrity Bounce** - ₦50,000

## 🔐 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- CORS Enabled
- Environment Variables for Sensitive Data
- Input Validation
- SQL/NoSQL Injection Prevention

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - Get user orders
- `PUT /api/orders/:id` - Update order status (Admin)

### Auth
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

## 🚀 Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Minification
- Tree shaking

## 📱 Contact Support

- **WhatsApp:** 07055706867
- **Telegram:** 08085185151
- **Email:** halimotlawal5@gmail.com

## 📄 License

Copyright © 2026 LEEMARH'S HAIR TREND. All rights reserved.

---

**Built with ❤️ for premium hair quality**
