import Wishlist from '../models/Wishlist.js';
import { sendSuccess } from '../utils/response.js';

export const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const wishlistItems = await Wishlist.findByUserId(userId);
    sendSuccess(res, 200, 'Wishlist retrieved successfully', wishlistItems);
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    
    const result = await Wishlist.add(userId, productId);
    if (!result) {
      return sendSuccess(res, 200, 'Item already in wishlist');
    }
    sendSuccess(res, 201, 'Item added to wishlist');
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    
    await Wishlist.remove(productId, userId);
    sendSuccess(res, 200, 'Item removed from wishlist');
  } catch (error) {
    next(error);
  }
};
