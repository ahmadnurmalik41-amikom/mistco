import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

class AuthService {
  static async register(userData) {
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw { statusCode: 400, message: 'Email already registered' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const userId = await User.create({ ...userData, password: hashedPassword });
    const user = await User.findById(userId);

    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
  }

  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = generateToken({ id: user.id, role: user.role });
    return { user: userData, token };
  }
}

export default AuthService;
