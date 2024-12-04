import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;
(async () => {
  db = await open({
    filename: './BD4.1_HW3/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//fetch all products

async function fetchAllProducts() {
  let query = 'SELECT * FROM products';
  let response = await db.all(query, []);

  return { products: response };
}

app.get('/products', async (req, res) => {
  let result = await fetchAllProducts();
  res.status(200).json(result);
});

// Retrieve Products by Brand

async function fetchProductsByBrand(brand) {
  let query = 'SELECT * FROM products WHERE brand = ?';
  let response = await db.all(query, [brand]);
  return { products: response };
}

app.get('/products/brand/:brand', async (req, res) => {
  let brand = req.params.brand;
  let result = await fetchProductsByBrand(brand);

  res.status(200).json(result);
});

// Retrieve Products by Category

async function fetchProductsByCategory(category) {
  let query = 'SELECT * FROM products WHERE category = ?';
  let response = await db.all(query, [category]);
  return { products: response };
}

app.get('/products/category/:category', async (req, res) => {
  let category = req.params.category;
  let result = await fetchProductsByCategory(category);
  res.status(200).json(result);
});

// Retrieve Products by stocks

async function fetchProductsByStock(stocks) {
  let query = 'SELECT * FROM products WHERE stock = ?';
  let response = await db.all(query, [stocks]);
  return { products: response };
}

app.get('/products/stock/:stocks', async (req, res) => {
  let stocks = req.params.stocks;
  let result = await fetchProductsByStock(stocks);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
