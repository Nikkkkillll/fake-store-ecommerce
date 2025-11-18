import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Error from "../components/Error";

/**
 * ProductsPage Component
 * -----------------------------
 * This is the main page that lists all products.
 *
 * Features:
 * - Fetches products from FakeStore API (via Redux)
 * - Search filter
 * - Category filter
 * - Max price filter
 * - Pagination
 * - Loading and error states
 *
 * Products are filtered BEFORE pagination so only
 * the correct items appear on the current page.
 */

export default function ProductsPage() {
  const dispatch = useDispatch();

  // Get product data + category list + API status from Redux store
  const { items, status, error, categories } = useSelector((s) => s.products);

  /** ------------------------------------------------------------------
   *  FILTER STATES
   *  These are local states used for filtering products before rendering.
   * ------------------------------------------------------------------ */
  const [search, setSearch] = useState("");              // Search keyword
  const [selectedCategory, setSelectedCategory] = useState("all"); // Selected category
  const [maxPrice, setMaxPrice] = useState("");          // Maximum price filter

  /** ------------------------------------------------------------------
   *  PAGINATION STATES
   *  page = current page number
   *  perPage = how many products to show per page
   * ------------------------------------------------------------------ */
  const [page, setPage] = useState(1);
  const perPage = 8;

  /** ------------------------------------------------------------------
   *  Fetch products on initial load
   *  Dispatch fetchProducts() only once on mount.
   * ------------------------------------------------------------------ */
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  /** ------------------------------------------------------------------
   *  FILTER LOGIC (Runs using useMemo for performance)
   *  Applies:
   *  - Search filter
   *  - Category filter
   *  - Max price filter
   * ------------------------------------------------------------------ */
  const filtered = useMemo(() => {
    let list = items;

    // 1) SEARCH filter (case-insensitive)
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    // 2) CATEGORY filter (FakeStore categories are simple strings)
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 3) MAX PRICE filter
    if (maxPrice) {
      list = list.filter((p) => p.price <= Number(maxPrice));
    }

    return list; // filtered list returned
  }, [items, search, selectedCategory, maxPrice]);

  /** ------------------------------------------------------------------
   *  PAGINATION CALCULATIONS
   *  Only show items that fall inside the current page range.
   * ------------------------------------------------------------------ */
  const total = filtered.length;                          // total filtered products
  const pages = Math.max(1, Math.ceil(total / perPage));  // number of pages
  const start = (page - 1) * perPage;                     // starting index
  const pageItems = filtered.slice(start, start + perPage); // items of selected page

  /**
   * If a filter reduces total number of pages and
   * current page becomes invalid, reset to page 1.
   */
  useEffect(() => {
    if (page > pages) setPage(1);
  }, [pages]);

  return (
    <>
      {/* ------------------------------------------------------------
          FILTER BAR 
          Appears right below the Header (search + category + price)
         ------------------------------------------------------------ */}
      <div className="filter-bar">

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-input"
        >
          <option value="all">All Collections</option>

          {/* Render all category options dynamically */}
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Max Price Filter */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="filter-input"
        />
      </div>

      {/* ------------------------------------------------------------
          CONTENT: Loading, Error, or Product Grid
         ------------------------------------------------------------ */}
      {status === "loading" && <Loader />}
      {status === "failed" && <Error message={error} />}

      {status === "succeeded" && (
        <>
          {/* PRODUCT GRID */}
          <div className="products-grid">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* --------------------------------------------------------
              PAGINATION CONTROLS
             -------------------------------------------------------- */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Previous Page Button */}
            <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Prev
            </button>

            {/* Page Indicator */}
            <span>
              {page} / {pages}
            </span>

            {/* Next Page Button */}
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}
