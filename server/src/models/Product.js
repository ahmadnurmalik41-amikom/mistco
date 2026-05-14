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
}

export default Product;
