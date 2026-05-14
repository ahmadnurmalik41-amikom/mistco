import api from '../api/axios.js';
import { clearCart } from './cart-service.js';

export const processCheckout = async (checkoutData) => {
  try {
    const response = await api.post('/checkout', checkoutData);
    if (response.data.success) {
      await clearCart(); // Clear cart on success
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, message: 'Checkout failed' };
  }
};
