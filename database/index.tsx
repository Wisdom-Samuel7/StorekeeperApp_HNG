import * as SQLite from "expo-sqlite";

// ✅ Open (or create) the local database
export const db = SQLite.openDatabaseSync("store.db");

// ✅ Initialize database
export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      image TEXT
    );
  `);
};

// ✅ Add product
export const addProduct = async (name, quantity, price, image) => {
  await initDB();
  await db.runAsync(
    "INSERT INTO products (name, quantity, price, image) VALUES (?, ?, ?, ?)",
    [name, quantity, price, image]
  );
};

// ✅ Get all products
export const getProducts = async () => {
  await initDB();
  const result = await db.getAllAsync("SELECT * FROM products");
  return result;
};

// ✅ Update product
export const updateProduct = async (id, name, quantity, price, image) => {
  await initDB();
  await db.runAsync(
    "UPDATE products SET name = ?, quantity = ?, price = ?, image = ? WHERE id = ?",
    [name, quantity, price, image, id]
  );
};

// ✅ Delete product
export const deleteProduct = async (id) => {
  await initDB();
  await db.runAsync("DELETE FROM products WHERE id = ?", [id]);
};
