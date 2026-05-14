import { pool } from '../config/db.js';

class Cart {
  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      `SELECT c.id, c.product_id, c.quantity, c.size, p.name, p.price, p.image_url 
       FROM carts c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = ?`,
      [userId]
    );
    return rows;
  }

  static async add(userId, productId, quantity, size) {
    // Check if item already exists in cart with same size
    const [existing] = await pool.execute(
      'SELECT id, quantity FROM carts WHERE user_id = ? AND product_id = ? AND size = ?',
      [userId, productId, size]
    );

    if (existing.length > 0) {
      // Update quantity
      const newQuantity = existing[0].quantity + quantity;
      await pool.execute('UPDATE carts SET quantity = ? WHERE id = ?', [newQuantity, existing[0].id]);
      return existing[0].id;
    } else {
      // Insert new item
      const [result] = await pool.execute(
        'INSERT INTO carts (user_id, product_id, quantity, size) VALUES (?, ?, ?, ?)',
        [userId, productId, quantity, size]
      );
      return result.insertId;
    }
  }

  static async updateQuantity(id, userId, quantity) {
    const [result] = await pool.execute(
      'UPDATE carts SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, id, userId]
    );
    return result.affectedRows;
  }

  static async remove(id, userId) {
    const [result] = await pool.execute('DELETE FROM carts WHERE id = ? AND user_id = ?', [id, userId]);
    return result.affectedRows;
  }

  static async clear(userId) {
    const [result] = await pool.execute('DELETE FROM carts WHERE user_id = ?', [userId]);
    return result.affectedRows;
  }
}

export default Cart;
