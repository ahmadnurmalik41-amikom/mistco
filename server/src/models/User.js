import { pool } from '../config/db.js';

class User {
  static async create(userData) {
    const { name, email, password, phone = null, address = null, role = 'user' } = userData;
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password, phone, address, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT id, name, email, phone, address, role FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}

export default User;
