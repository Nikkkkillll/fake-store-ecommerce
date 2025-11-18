import React from "react";

/**
 * FilterBar Component
 * -----------------------------
 * This component displays the main filter controls for the product list.
 * It contains three filters:
 * 1. Search bar (search by product title)
 * 2. Category dropdown (Collections)
 * 3. Max price filter
 *
 * All state values and update functions are received as props from ProductsPage.
 * This makes the FilterBar reusable and keeps it stateless.
 */

export default function FilterBar({
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice
}) {
  return (
    // Main container for search + category + price filters
    <div className="filter-bar">

      {/* -------------------------------
          Search Bar Input
          Filters products based on title
      -------------------------------- */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}                // controlled input: current search state
        onChange={(e) => setSearch(e.target.value)} // update search state
        className="filter-input"
      />

      {/* -------------------------------
          Category Dropdown
          Filters products by category
      -------------------------------- */}
      <select
        value={selectedCategory}          // currently selected category
        onChange={(e) => setSelectedCategory(e.target.value)} // update category
        className="filter-input"
      >
        {/* Default option: show all products */}
        <option value="all">All Collections</option>

        {/* Render all categories dynamically */}
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* -------------------------------
          Max Price Filter
          Filters products below a price
      -------------------------------- */}
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}             // current max price
        onChange={(e) => setMaxPrice(e.target.value)} // update max price state
        className="filter-input"
      />

    </div>
  );
}
