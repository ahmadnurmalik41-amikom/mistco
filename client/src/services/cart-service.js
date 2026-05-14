import api from '../api/axios.js';
import { Storage } from '../utils/storage.js';

export const getCart = async () => {
  if (Storage.getToken()) {
    try {
      const response = await api.get('/cart');
      return response.data.data;
    } catch (error) {
      console.warn('Failed to fetch remote cart', error);
    }
  }
  return Storage.getLocalCart();
};

export const addToCart = async (product, quantity = 1, size = 'M') => {
  if (Storage.getToken()) {
    try {
      await api.post('/cart', { productId: product.id, quantity, size });
      return true;
    } catch (error) {
      console.error('Failed to add to remote cart', error);
      throw error;
    }
  } else {
    // Local cart fallback
    const cart = Storage.getLocalCart();
    const existingIndex = cart.findIndex(item => item.product_id === product.id && item.size === size);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: Date.now(), // Fake ID
        product_id: product.id,
        quantity,
        size,
        name: product.name,
        price: product.price,
        image_url: product.image || product.image_url
      });
    }
    Storage.setLocalCart(cart);
    return true;
  }
};

export const removeFromCart = async (id) => {
  if (Storage.getToken()) {
    try {
      await api.delete(`/cart/${id}`);
      return true;
    } catch (error) {
      console.error('Failed to remove from remote cart', error);
      throw error;
    }
  } else {
    let cart = Storage.getLocalCart();
    cart = cart.filter(item => item.id !== id);
    Storage.setLocalCart(cart);
    return true;
  }
};

export const updateQuantity = async (id, quantity) => {
  if (Storage.getToken()) {
    try {
      await api.put(`/cart/${id}`, { quantity });
      return true;
    } catch (error) {
      console.error('Failed to update remote cart', error);
      throw error;
    }
  } else {
    const cart = Storage.getLocalCart();
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
      cart[index].quantity = quantity;
      Storage.setLocalCart(cart);
    }
    return true;
  }
};

export const clearCart = async () => {
  if (Storage.getToken()) {
    try {
      await api.delete('/cart');
    } catch (error) {
      console.error('Failed to clear remote cart', error);
    }
  }
  Storage.setLocalCart([]);
};
