import React, { useState, useEffect } from 'react';

/**
 * Filters Component
 * -----------------------------
 * This component provides:
 * 1. Category filter (dropdown)
 * 2. Max price filter (number input)
 *
 * It receives:
 * - categories: array of category strings
 * - onFilter: callback function to send filter values back to the parent
 *
 * Local state:
 * - category: currently selected category
 * - maxPrice: user-entered maximum price
 *
 * Whenever category or maxPrice changes, the component notifies the parent
 * through the onFilter callback (inside useEffect).
 */

export default function Filters({ categories = [], onFilter }) {
  
  // Selected category (default: "all")
  const [category, setCategory] = useState('all');

  // Maximum price value entered by the user
  const [maxPrice, setMaxPrice] = useState('');

  /**
   * useEffect runs whenever:
   * - category changes
   * - maxPrice changes
   * - onFilter reference changes
   *
   * It sends the updated filter values to the parent component.
   */
  useEffect(() => {
    onFilter({
      category,
      maxPrice: maxPrice ? Number(maxPrice) : null
    });
  }, [category, maxPrice, onFilter]);

  return (
    <div className="filters-box">

      {/* Category Filter */}
      <label>Category</label>
      <select
        value={category}                    // current category selection
        onChange={(e) => setCategory(e.target.value)}  // update category
      >
        <option value="all">All</option>

        {/* Render all category options dynamically */}
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Max Price Filter */}
      <label>Max price</label>
      <input
        type="number"
        value={maxPrice}                     // current max price value
        onChange={(e) => setMaxPrice(e.target.value)} // update max price
        placeholder="e.g. 100"
      />

    </div>
  );
}
