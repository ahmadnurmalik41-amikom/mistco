import api from '../api/axios.js';
import { Storage } from '../utils/storage.js';

export const getWishlist = async () => {
  try {
    const response = await api.get('/wishlist');
    return response.data.data;
  } catch (error) {
    return Storage.getLocalWishlist();
  }
};

export const addToWishlist = async (product) => {
  try {
    const response = await api.post('/wishlist', { productId: product.id });
    return response.data.success;
  } catch (error) {
    const wishlist = Storage.getLocalWishlist();
    if (!wishlist.find(item => item.id == product.id)) {
      wishlist.push(product);
      Storage.setLocalWishlist(wishlist);
    }
    return true;
  }
};

export const toggleWishlist = async (product) => {
  try {
    const wishlist = await getWishlist();
    const exists = wishlist.find(item => item.id == product.id);

    if (exists) {
      await removeFromWishlist(product.id);
      return { action: 'removed', product };
    } else {
      await addToWishlist(product);
      return { action: 'added', product };
    }
  } catch (error) {
    console.error('Toggle wishlist failed', error);
    throw error;
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data.success;
  } catch (error) {
    let wishlist = Storage.getLocalWishlist();
    wishlist = wishlist.filter(item => item.id != productId);
    Storage.setLocalWishlist(wishlist);
    return true;
  }
};
