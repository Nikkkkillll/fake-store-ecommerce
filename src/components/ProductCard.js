import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ProductCard Component
 * -----------------------------
 * This component represents a single product card displayed
 * inside the product grid on the Products Page.
 *
 * It shows:
 * - Product image
 * - Product title
 * - Price
 * - Category
 *
 * When the card is clicked, it navigates to the Product Details page
 * using React Router's <Link> component.
 */

export default function ProductCard({ product }) {
  return (
    <div className="product-card card">
      
      {/* 
        Image section
        -------------
        The image is wrapped inside a <Link> to make the whole
        picture clickable. Clicking navigates to /product/:id
      */}
      <Link to={`/product/${product.id}`} className="img-wrap">
        <img
          src={product.image}
          alt={product.title}
        />
      </Link>

      {/* Product title */}
      <div className="product-title">{product.title}</div>

      {/* Price + Category Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between', // push content apart
          alignItems: 'center',
          marginTop: 8
        }}
      >

        {/* Product price */}
        <div className="price">${product.price.toFixed(2)}</div>

        {/* Product category (FakeStore API returns string) */}
        <div className="category-tag">{product.category}</div>
      </div>

    </div>
  );
}
