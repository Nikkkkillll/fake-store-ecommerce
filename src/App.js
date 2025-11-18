import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';

/**
 * App Component
 * ---------------------------------------------------------
 * This is the root component of your application.
 *
 * Responsibilities:
 * - Displays the Header on all pages
 * - Wraps the main content inside a container
 * - Defines all application routes using React Router v6
 *
 * Pages:
 *  - "/"                 → ProductsPage (list of all products)
 *  - "/product/:id"      → ProductDetails (single product view)
 *  - "/cart"             → CartPage (shopping cart)
 */

function App() {
  return (
    <>
      {/* Global header visible on every page */}
      <Header />

      {/* Main container for page content */}
      <div className="container">

        {/* React Router definitions */}
        <Routes>

          {/* Home / Products list */}
          <Route path="/" element={<ProductsPage />} />

          {/* Product details page */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Cart page */}
          <Route path="/cart" element={<CartPage />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
