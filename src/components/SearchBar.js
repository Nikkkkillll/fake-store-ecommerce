import React from "react";

/**
 * SearchBar Component
 * -----------------------------
 * This component provides:
 *  - Text search input
 *  - Min price filter
 *  - Max price filter
 *
 * It is a "controlled" component:
 * All state values (search, minPrice, maxPrice) and
 * their update functions (setSearch, setMinPrice, setMaxPrice)
 * are passed down from the parent component.
 *
 * This keeps SearchBar stateless and reusable.
 */

export default function SearchBar({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}) {
  return (
    // Main container for all search + price inputs
    <div className="search-container">
      
      {/* -----------------------------------
          Search Text Input
          Filters products by title or text
      ----------------------------------- */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}                 // controlled value from parent
        onChange={(e) => setSearch(e.target.value)} // update search keyword
        className="search-input"
      />

      {/* -----------------------------------
          Minimum Price Filter
      ----------------------------------- */}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}               // controlled min price
        onChange={(e) => setMinPrice(e.target.value)} // update min price
        className="price-input"
      />

      {/* -----------------------------------
          Maximum Price Filter
      ----------------------------------- */}
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}               // controlled max price
        onChange={(e) => setMaxPrice(e.target.value)} // update max price
        className="price-input"
      />
    </div>
  );
}
