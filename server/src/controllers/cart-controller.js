import Cart from '../models/Cart.js';
import { sendSuccess } from '../utils/response.js';

export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.findByUserId(userId);
    sendSuccess(res, 200, 'Cart retrieved successfully', cartItems);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1, size } = req.body;
    
    await Cart.add(userId, productId, quantity, size);
    sendSuccess(res, 201, 'Item added to cart');
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;
    
    await Cart.updateQuantity(id, userId, quantity);
    sendSuccess(res, 200, 'Cart item updated');
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    await Cart.remove(id, userId);
    sendSuccess(res, 200, 'Item removed from cart');
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await Cart.clear(userId);
    sendSuccess(res, 200, 'Cart cleared');
  } catch (error) {
    next(error);
  }
};
