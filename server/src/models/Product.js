import { pool } from '../config/db.js';

class Product {
  static async findAll(category = null) {
    let query = 'SELECT * FROM products';
    const params = [];
    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    const [rows] = await pool.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async search(keyword) {
    const [rows] = await pool.execute('SELECT * FROM products WHERE name LIKE ? OR description LIKE ?', [`%${keyword}%`, `%${keyword}%`]);
    return rows;
  }

  static async create(data) {
    const { name, description, price, stock, category, image_url } = data;
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, stock, category, image_url]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { name, description, price, stock, category, image_url } = data;
    await pool.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image_url = ? WHERE id = ?',
      [name, description, price, stock, category, image_url, id]
    );
    return true;
  }

  static async delete(id) {
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    return true;
  }
}

export default Product;
