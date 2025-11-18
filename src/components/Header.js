import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Header Component
 * -----------------------------
 * This component displays the top navigation bar of the app.
 * It includes:
 * - Logo (links to homepage)
 * - Navigation links (Products, Cart)
 * - Cart badge showing total items in cart
 *
 * It reads cart data from Redux using useSelector,
 * calculates the total quantity of items in the cart,
 * and displays it inside a badge.
 */

export default function Header() {

  // Access the "items" object from Redux cart slice
  const items = useSelector((s) => s.cart.items);

  /**
   * Calculate total quantity of items in cart
   * items = { 1: {product, qty}, 2: {product, qty}, ... }
   *
   * Object.values(items) gives an array of all cart entries.
   * We reduce that array to sum all quantities.
   */
  const totalQty = Object.values(items).reduce((acc, it) => acc + it.qty, 0);

  return (
    <header className="header">
      <div className="inner">

        {/* App Logo - clicking it returns to homepage */}
        <Link to="/" className="logo">FakeStore</Link>

        {/* Navigation Links */}
        <nav className="nav-links">

          {/* Products Page Link */}
          <Link to="/">Products</Link>

          {/* Cart Link with Quantity Badge */}
          <Link to="/cart">
            Cart{" "}
            <span className="cart-badge">
              {totalQty} {/* total cart items */}
            </span>
          </Link>

        </nav>
      </div>
    </header>
  );
}
