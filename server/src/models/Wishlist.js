import { pool } from '../config/db.js';

class Wishlist {
  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      `SELECT p.id, p.name, p.price, p.image_url 
       FROM wishlists w 
       JOIN products p ON w.product_id = p.id 
       WHERE w.user_id = ?`,
      [userId]
    );
    return rows;
  }

  static async add(userId, productId) {
    try {
      const [result] = await pool.execute(
        'INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)',
        [userId, productId]
      );
      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return null; // Already in wishlist
      }
      throw error;
    }
  }

  static async remove(productId, userId) {
    const [result] = await pool.execute(
      'DELETE FROM wishlists WHERE product_id = ? AND user_id = ?',
      [productId, userId]
    );
    return result.affectedRows;
  }
}

export default Wishlist;
