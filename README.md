🌟 FakeStore E-Commerce Web App

A modern, responsive e-commerce web application built with React, Redux Toolkit, and FakeStore API.

📖 Overview

FakeStore E-Commerce is a fully functional shopping platform that showcases product listing, filtering, searching, cart management, pagination, and persistent cart data — all powered by FakeStore API and Redux Toolkit.

This project is built to demonstrate real-world industry-level frontend development structure and coding patterns.

🚀 Features
🛍 Product Listing

Display all products fetched from FakeStore API

Responsive grid UI

Product image, title, price, category

🔍 Search & Filters

Search by product name

Filter by category

Filter by max price

Fully reactive filter system

📄 Product Details

Full product information

Rating, category, description

Add to Cart button

🛒 Shopping Cart

Increase / decrease quantity

Remove items

Clear cart

Auto-calculated totals

💾 Persistent Cart

Cart is saved in localStorage

Reloads automatically on page refresh

📑 Pagination

8 products per page

Prev / Next navigation

Autoreset on filter change

⚠ Loading & Error UI

Loader during API fetch

Error UI in case of failure

🧰 Tech Stack
Technology	Purpose
React	UI components
Redux Toolkit	Global state management
React Router	Navigation
Axios	API requests
FakeStore API	Product data
CSS	Styling & responsiveness
📁 Folder Structure
src/
│
├── components/
│   ├── Header.js
│   ├── ProductCard.js
│   ├── Loader.js
│   ├── Error.js
│
├── pages/
│   ├── ProductsPage.js
│   ├── ProductDetails.js
│   ├── CartPage.js
│
├── redux/
│   ├── store.js
│   └── slices/
│       ├── productsSlice.js
│       └── cartSlice.js
│
├── App.js
└── index.js

🔗 API
Base URL:
https://fakestoreapi.com

Endpoints Used
Endpoint	Description
/products	Get all products
/products/:id	Get product details

⚙ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/fake-store-ecommerce.git
cd fake-store-ecommerce

2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm start


Application will run at:

http://localhost:3000/


💡 How It Works
🌀 Products

Fetched via Redux async thunks:

fetchProducts()
fetchProductById(id)

💾 Persistence

Saved automatically with:

localStorage.setItem("cartState", JSON.stringify(state.cart));

👨‍💻 Author

Nikhil Bhasarkar
GitHub: https://github.com/Nikkkkillll


⭐ Support

If you like this project, please give it a ⭐ star on GitHub.
It motivates me to create more amazing projects. 💙