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
    const user = await AuthService.getProfile(req.user.id);
    sendSuccess(res, 200, 'Profile retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await AuthService.updateProfile(req.user.id, req.body);
    sendSuccess(res, 200, 'Profile updated successfully', user);
  } catch (error) {
    next(error);
  }
};
