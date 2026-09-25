# TechHive

TechHive is a modern e-commerce web application built with React, React Router, Material UI (MUI), Firebase, Firestore, and Paystack.

The application allows customers to browse technology products, search and filter products, manage their shopping cart, create accounts, place orders, make payments through Paystack, and view their order history.

It also includes an admin panel for managing products and customer orders.

---

## Live Application

**Live URL:**  
https://techhive-gamma.vercel.app

## GitHub Repository

**Repository:**  
https://github.com/EugeneBruno/techhive

---

## Project Requirements

TechHive was developed using the following technologies and concepts:

- React
- React Router
- Material UI (MUI)
- Firebase Authentication
- Firebase Firestore
- Responsive design
- Git and GitHub
- Paystack payment gateway
- CRUD operations
- React state management
- Forms
- Loading and error states

---

## Features

### Customer Features

#### Home Page

- Hero section
- Featured products
- Products loaded from Firestore
- Progressive product display
- "See More" product pagination
- Navigation to the full product catalogue

#### Product Catalogue

- View all available products
- Product categories
- Product search
- Price sorting
- Category filtering
- Progressive pagination
- Real-time product updates from Firestore
- Product cards with product information

#### Product Details

- Product image
- Product name
- Product category
- Product price
- Product description
- Quantity controls
- Add to cart
- Navigation back to products

#### Shopping Cart

- Add products to cart
- Update product quantities
- Remove products
- Display total item count
- Calculate cart total
- Guest cart support
- User-specific cart persistence

#### Authentication

- User registration
- User login
- Firebase Authentication
- Logout
- Protected checkout
- Protected customer profile
- Admin route protection

#### Checkout

- Customer contact information
- Delivery information
- Order summary
- Paystack payment
- Payment verification
- Successful orders saved to Firestore

#### Profile

- Customer profile information
- Order history
- Order status
- Payment status
- Real-time order updates

---

## Admin Features

TechHive includes an admin dashboard for managing the store.

### Product Management

Administrators can:

- View products
- Add products
- Edit products
- Delete products
- Manage product information
- Manage product categories
- Manage prices
- Manage product images
- Manage product descriptions

Products are stored in the Firestore `products` collection.

### Order Management

Administrators can:

- View customer orders
- View order details
- View payment information
- Update order status
- Monitor order processing

---

## Payment System

TechHive uses Paystack for online payments.

The payment flow is:

```text
Customer
   ↓
Checkout
   ↓
Create Order
   ↓
Initialize Paystack Payment
   ↓
Paystack Checkout
   ↓
Payment
   ↓
Verify Transaction
   ↓
Update Firestore Order
   ↓
Payment Confirmed
```

Successful payments update the order with information including:

- Payment method
- Payment status
- Payment reference
- Payment channel
- Payment timestamp
- Order status

---

## Technology Stack

### Frontend

- React
- React Router
- Material UI
- CSS
- JavaScript

### Backend / Services

- Firebase Authentication
- Firebase Firestore
- Vercel Serverless Functions
- Paystack API

### Development Tools

- Git
- GitHub
- Visual Studio Code
- IntelliJ IDEA
- Postman
- npm

---

## Project Structure

```text
techhive/
│
├── api/
│   ├── initialize-payment.js
│   └── verify-payment.js
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── AdminRoute.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── firebase/
│   │   └── firebaseConfig.js
│   │
│   ├── hooks/
│   │   └── useProducts.js
│   │
│   ├── pages/
│   │   ├── AddProduct.jsx
│   │   ├── Admin.jsx
│   │   ├── AdminOrders.jsx
│   │   ├── AdminProducts.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── EditProduct.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   │
│   ├── utils/
│   │   └── formatCurrency.js
│   │
│   ├── App.css
│   ├── App.js
│   └── index.css
│
├── package.json
└── README.md
```

---

## Firestore Collections

### Users

The `users` collection stores registered customer information and user roles.

Example structure:

```text
users/
   userId/
      firstName
      lastName
      email
      phone
      role
```

Possible roles include:

```text
customer
admin
```

### Products

Products are stored in:

```text
products/
   productId/
```

Product information includes fields such as:

```text
name
category
price
description
image
```

### Orders

Customer orders are stored in:

```text
orders/
   orderId/
```

Orders contain information including:

```text
userId
items
total
paymentMethod
paymentStatus
paymentReference
paymentChannel
status
createdAt
updatedAt
```

---

## Environment Variables

Create a `.env` file in the project root.

### Firebase Client Configuration

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

### Server-side Payment Configuration

The following variables are configured in the Vercel project environment and should not be exposed in the React frontend:

```env
PAYSTACK_SECRET_KEY=your_paystack_secret_key

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
```

> Never commit `.env` files, Paystack secret keys, or Firebase service-account credentials to GitHub.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/EugeneBruno/techhive.git
```

Move into the project directory:

```bash
cd techhive
```

Install dependencies:

```bash
npm install
```

Create the required environment variables.

Then start the React development server:

```bash
npm start
```

The application will normally be available at:

```text
http://localhost:3000
```

---

## Available Scripts

### Start Development Server

```bash
npm start
```

Runs the application in development mode.

### Build for Production

```bash
npm run build
```

Creates an optimized production build.

### Run Tests

```bash
npm test
```

Runs the project's test command provided by Create React App.

---

## Authentication and Authorization

Firebase Authentication is used to manage customer accounts.

Protected routes include:

```text
/checkout
/profile
```

Administrative routes are protected using the `AdminRoute` component.

Administrative pages include:

```text
/admin
/admin/products
/admin/products/new
/admin/products/edit/:id
/admin/orders
```

The user's Firestore document contains a `role` field that determines whether the user has administrative access.

---

## Cart Management

The cart supports both guests and authenticated users.

### Guest Cart

Guest cart data is stored in:

```text
localStorage
```

using:

```text
techhive_guest_cart
```

### Authenticated User Cart

Each authenticated user receives a separate cart:

```text
techhive_cart_USER_ID
```

When a guest signs in, the guest cart is merged into the authenticated user's cart.

---

## Product Data

Firestore is the primary source of truth for products displayed throughout the storefront.

The application uses the custom `useProducts` hook to retrieve products from Firestore.

This allows products added through the admin panel to automatically appear on:

- Home
- Products
- Product Details

without requiring the product to be manually added to the frontend source code.

---

## Product Pagination

The Home and Products pages use progressive product loading.

The initial display shows:

```text
3 products
```

Selecting **SEE MORE** reveals additional products in groups of four.

The Products page also resets pagination when the customer changes:

- Category
- Search term
- Sort option

---

## Design System

TechHive uses a clean editorial visual style with the following design tokens:

| Purpose | Color |
|---|---|
| Background | `#F8F9FA` |
| Primary Accent | `#C85A32` |
| Primary Text | `#111215` |
| Muted Text | `#6E727A` |
| Cards / Surfaces | `#FFFFFF` |
| Borders | `#EDEDED` |

The interface uses Nigerian Naira (`₦`) for product pricing.

---

## Responsive Design

The application is designed to work across:

- Desktop
- Tablet
- Mobile

Responsive styling is implemented using CSS media queries and responsive component layouts.

---

## Security

Firestore rules restrict administrative product operations and administrative order management to authenticated users with an admin role.

Customer data and orders are protected using Firebase Authentication and Firestore security rules.

Sensitive server-side credentials are stored as Vercel environment variables rather than being exposed in the frontend application.

---

## Deployment

The application is deployed using Vercel.

Production deployment:

```text
https://techhive-gamma.vercel.app
```

The payment API is implemented using Vercel serverless functions located in:

```text
/api
```

These functions communicate with Paystack and Firebase Admin.

---

## Git Workflow

Git and GitHub were used throughout development.

The project uses feature branches for major development stages, including:

```text
main
dev
feature/home-page
feature/product-details
feature/cart
feature/authentication
feature/order-history
feature/admin-panel
feature/payment
```

Completed features were merged into the development branch before final deployment.

---

## Project Pages

### Customer Pages

```text
/
/products
/products/:id
/cart
/checkout
/login
/register
/profile
```

### Admin Pages

```text
/admin
/admin/products
/admin/products/new
/admin/products/edit/:id
/admin/orders
```

---

## Project Objectives

The project demonstrates practical implementation of:

- Component-based React development
- Client-side routing
- React state management
- Forms and form handling
- Authentication
- Authorization
- Firestore database operations
- CRUD functionality
- Search and filtering
- Shopping cart management
- Order management
- Payment gateway integration
- API/serverless functions
- Responsive UI development
- Git and GitHub workflow
- Production deployment

---
