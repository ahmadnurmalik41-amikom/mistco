import Transaction from '../models/Transaction.js';
import PaymentService from '../services/payment-service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const processCheckout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { totalAmount, shippingAddress, items, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return sendError(res, 400, 'Cart is empty');
    }

    // 1. Create Transaction
    const transactionId = await Transaction.create(userId, totalAmount, shippingAddress, items);

    // 2. Process Payment
    const paymentResult = await PaymentService.processPayment(transactionId, paymentMethod);

    sendSuccess(res, 201, 'Checkout successful', {
      transactionId,
      paymentStatus: paymentResult.status
    });
  } catch (error) {
    next(error);
  }
};
