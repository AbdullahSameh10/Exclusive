# Exclusive 🛒

A modern full-featured e-commerce web application built with React, TypeScript, Tailwind CSS, and Firebase.

Exclusive provides a complete online shopping experience with product browsing, authentication, wishlist management, shopping cart, checkout flow, order management, and digital receipts.

The project focuses on creating a responsive, clean, and user-friendly shopping experience with modern frontend technologies.

---

## 🚀 Features

### 🔐 Authentication

- User registration and login
- Email verification
- Google authentication support
- Persistent authentication state
- Secure user profile management using Firebase

---

### 🛍️ Product Management

- Browse available products
- Product details page
- Product categories
- Product information display:
  - Images
  - Prices
  - Ratings
  - Reviews
  - Specifications
  - Availability status

- Responsive product cards
- Loading states for better UX

---

### ❤️ Wishlist System

- Add/remove products from wishlist
- Persistent wishlist storage
- Wishlist counter notification
- Dedicated wishlist page

---

### 🛒 Shopping Cart

- Add products to cart
- Increase/decrease product quantities
- Remove products
- Dynamic cart calculations
- Persistent cart data
- Duplicate product handling

---

### 💳 Checkout System

Complete checkout workflow including:

- Billing information form
- Address management
- Order summary
- Discount calculations
- Shipping calculations
- Multiple payment method selection
- Promo code support

Supported promo codes include:

- SAVE10
- FIFA26
- User-based discount codes

---

### 📦 Order Management

Users can:

- Place orders
- View order history
- View order details
- Track order status

Order statuses:

- Pending
- Processing
- Shipped
- Delivered
- Cancelled

---

### 🧾 Digital Receipt System

Generated order receipts include:

- Customer information
- Ordered products
- Shipping details
- Payment information
- Order summary
- Total price calculation

Additional features:

- Print receipt support
- Responsive receipt design
- Professional invoice layout

---

### 🎨 UI / UX Features

- Fully responsive design
- Dark mode support
- Modern card-based layouts
- Smooth transitions and animations
- Custom scrollbars
- Mobile-friendly interface
- Clean reusable components

---

## 🛠️ Technologies Used

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Context API

### Backend / Services

- Firebase Authentication
- Firebase Firestore
- Firebase Storage

### UI Libraries

- Lucide React
- Font Awesome
- Styled Components

### Development Tools

- pnpm
- ESLint
- VS Code

---

## 📂 Project Structure

```
src
│
├── Assets
├── Components
│   ├── Elements
│   ├── Layouts
│   └── Pages
│
├── Context
├── Hooks
├── Types
├── Utils
├── Authentication
│
├── App.tsx
└── main.tsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/AbdullahSameh10/Exclusive.git
```

Navigate into the project:

```bash
cd Exclusive
```

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

The application will start locally.

---

## 🔥 Firebase Configuration

Create a Firebase project and add your configuration.

Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Enable:

- Firebase Authentication
- Firestore Database
- Firebase Storage

---

## 📱 Screens

The application includes:

- Home page
- Product listing page
- Product details page
- Wishlist page
- Cart page
- Authentication pages
- Checkout page
- Orders page
- Receipt modal

---

## 🎯 Future Improvements

Possible future updates:

- Real payment gateway integration
- Product reviews submission
- Admin dashboard
- Inventory management
- Advanced product filtering
- Notifications system
- Email order confirmations

---

## 👨‍💻 Author

**Abdullah Sameh**

Frontend Developer

GitHub:
https://github.com/AbdullahSameh10

---

## ⭐ Support

If you like this project, consider giving it a star ⭐ on GitHub.

---

## 📄 License

This project is for learning and portfolio purposes.