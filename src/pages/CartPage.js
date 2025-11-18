import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuantity, removeFromCart, clearCart } from '../redux/slices/cartSlice';

/**
 * CartPage Component
 * -----------------------------
 * This page displays all items added to the cart.
 *
 * Features:
 * - Shows list of cart items
 * - Allows changing quantity
 * - Allows removing items
 * - Shows total price
 * - Provides "Clear Cart" and "Checkout" buttons
 *
 * Redux:
 * - Reads cart items from Redux using useSelector()
 * - Updates cart using dispatch() with actions:
 *      setQuantity
 *      removeFromCart
 *      clearCart
 */

export default function CartPage() {

  // Access the entire items object from Redux cart slice
  const items = useSelector(s => s.cart.items);

  // Convert the object {1:{}, 2:{}} into an array for mapping
  const list = Object.values(items);

  const dispatch = useDispatch();

  // Calculate grand total: sum of (price * quantity) for each item
  const total = list.reduce((acc, it) => acc + it.product.price * it.qty, 0);

  return (
    <div>

      {/* Page Title */}
      <h2>Your Cart</h2>

      {/* If cart is empty, show message */}
      {list.length === 0 && (
        <div style={{ marginTop: 12 }}>Cart is empty</div>
      )}

      {/* Render cart items */}
      {list.map(({ product, qty }) => (
        <div key={product.id} className="cart-item">

          {/* Product Image */}
          <img 
            src={product.image} 
            alt={product.title} 
          />

          {/* Product Info */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>
              {product.title}
            </div>
            <div>
              ${product.price.toFixed(2)}
            </div>
          </div>

          {/* Quantity + Remove Button */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'flex-end'
            }}
          >

            {/* Quantity Input */}
            <input
              className="qty-input"
              type="number"
              min="1"
              value={qty}  // current quantity
              onChange={(e) =>
                dispatch(setQuantity({ 
                  id: product.id, 
                  qty: Number(e.target.value) 
                }))
              }
            />

            {/* Remove Button */}
            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(product.id))}
            >
              Remove
            </button>

          </div>
        </div>
      ))}

      {/* Only show total + buttons if cart is not empty */}
      {list.length > 0 && (
        <>
          {/* Total Box */}
          <div className="total-box">
            <div>Total</div>
            <div style={{ fontWeight: 700 }}>
              ${total.toFixed(2)}
            </div>
          </div>

          {/* Checkout and Clear Cart Buttons */}
          <div style={{ marginTop: 12 }}>
            <button onClick={() => dispatch(clearCart())}>
              Clear
            </button>
            <button style={{ marginLeft: 8 }}>
              Checkout
            </button>
          </div>
        </>
      )}

    </div>
  );
}
