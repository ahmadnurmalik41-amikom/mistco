import AuthService from '../services/auth-service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const register = async (req, res, next) => {
  try {
    const { user, token } = await AuthService.register(req.body);
    sendSuccess(res, 201, 'User registered successfully', { user, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);
    sendSuccess(res, 200, 'Login successful', { user, token });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    // User data is attached by auth middleware
    sendSuccess(res, 200, 'Profile retrieved successfully', req.user);
  } catch (error) {
    next(error);
  }
};
