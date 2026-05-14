import api from '../api/axios.js';
import { Storage } from '../utils/storage.js';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      Storage.setToken(response.data.data.token);
      Storage.setUser(response.data.data.user);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, message: 'Network error' };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      Storage.setToken(response.data.data.token);
      Storage.setUser(response.data.data.user);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, message: 'Network error' };
  }
};

export const logout = () => {
  Storage.removeToken();
  Storage.removeUser();
  window.location.href = '/pages/login.html';
};

export const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, message: 'Network error' };
  }
};
