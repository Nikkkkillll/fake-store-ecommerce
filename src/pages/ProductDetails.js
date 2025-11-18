import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/Loader';
import Error from '../components/Error';

/**
 * ProductDetails Component
 * -----------------------------
 * This page displays detailed information for a single product.
 *
 * Features:
 * - Fetch product details using the product ID from URL
 * - Show loading state while fetching
 * - Show error message if the API call fails
 * - Display product information (image, title, price, category, rating)
 * - Allow adding the product to the cart
 *
 * The product is fetched using Redux Toolkit thunk: fetchProductById(id)
 */

export default function ProductDetails() {

  // Get product ID from route URL (/product/:id)
  const { id } = useParams();

  // Redux tools
  const dispatch = useDispatch();
  const { productDetails } = useSelector(s => s.products);

  /**
   * useEffect
   * -----------------
   * Runs when:
   * - The component mounts
   * - The "id" parameter changes
   *
   * It dispatches an action to load the product details
   * from the FakeStore API.
   */
  useEffect(() => { 
    dispatch(fetchProductById(id)); 
  }, [dispatch, id]);

  /**
   * If productDetails is still null,
   * it means the data is still loading.
   */
  if (!productDetails) return <Loader />;

  /**
   * If API returned an error, show error component.
   */
  if (productDetails.error) return <Error message={productDetails.error} />;

  // Store product details in a shorter variable for convenience
  const p = productDetails;

  return (
    <div className="details-container">
      
      <div className="details-grid">

        {/* Product Image */}
        <div>
          <img src={p.image} alt={p.title} />
        </div>

        {/* Product Info Section */}
        <div>
          {/* Title */}
          <h1>{p.title}</h1>

          {/* Price */}
          <div 
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginTop: 10
            }}
          >
            ${p.price.toFixed(2)}
          </div>

          {/* Category */}
          <div style={{ marginTop: 8 }}>
            Category: 
            <span className="category-tag">{p.category}</span>
          </div>

          {/* Description */}
          <p style={{ marginTop: 12 }}>{p.description}</p>

          {/* Rating */}
          <div style={{ marginTop: 8 }}>
            Rating: {p.rating?.rate ?? "N/A"} ({p.rating?.count ?? 0})
          </div>

          {/* Add to Cart Button */}
          <button
            className="add-btn"
            style={{ marginTop: 16 }}
            onClick={() => dispatch(addToCart(p))}
          >
            Add to cart
          </button>

        </div>
      </div>
    </div>
  );
}
