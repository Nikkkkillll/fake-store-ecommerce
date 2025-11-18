import React from 'react';

/**
 * Loader Component
 * -----------------------------
 * This component is displayed whenever the app
 * is waiting for data (API request in progress).
 *
 * It simply shows a "Loading..." message with
 * padding and centered alignment.
 *
 * This is used in:
 * - ProductsPage (while fetching products)
 * - ProductDetails (while fetching single item)
 */

export default function Loader() {
  return (
    <div
      className="center"  // class that centers text (from main.css)
      style={{ padding: 40 }}  // space around the text
    >
      Loading...
    </div>
  );
}
