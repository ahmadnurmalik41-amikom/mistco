import { pool } from '../config/db.js';

class Transaction {
  static async create(userId, totalAmount, shippingAddress, items) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Create transaction record
      const [transResult] = await connection.execute(
        'INSERT INTO transactions (user_id, total_amount, shipping_address) VALUES (?, ?, ?)',
        [userId, totalAmount, shippingAddress]
      );
      const transactionId = transResult.insertId;

      // Create transaction items
      for (const item of items) {
        await connection.execute(
          'INSERT INTO transaction_items (transaction_id, product_id, quantity, price, size) VALUES (?, ?, ?, ?, ?)',
          [transactionId, item.product_id, item.quantity, item.price, item.size]
        );
        
        // Update product stock (Optional: depending on business logic)
        // await connection.execute('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
      }

      // Clear user cart
      await connection.execute('DELETE FROM carts WHERE user_id = ?', [userId]);

      await connection.commit();
      return transactionId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async findById(id, userId) {
    const [transRows] = await pool.execute(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if (transRows.length === 0) return null;
    const transaction = transRows[0];

    const [itemRows] = await pool.execute(
      `SELECT ti.*, p.name, p.image_url 
       FROM transaction_items ti 
       JOIN products p ON ti.product_id = p.id 
       WHERE ti.transaction_id = ?`,
      [id]
    );

    transaction.items = itemRows;
    return transaction;
  }

  static async findAll() {
    const [rows] = await pool.execute(
      `SELECT t.*, u.name as user_name, u.email as user_email 
       FROM transactions t 
       JOIN users u ON t.user_id = u.id 
       ORDER BY t.created_at DESC`
    );
    return rows;
  }

  static async updateStatus(id, status) {
    await pool.execute(
      'UPDATE transactions SET status = ? WHERE id = ?',
      [status, id]
    );
    return true;
  }
}

export default Transaction;
