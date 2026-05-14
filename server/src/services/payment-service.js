import Transaction from '../models/Transaction.js';

class PaymentService {
  static async processPayment(transactionId, paymentMethod) {
    // In a real app, integrate with payment gateway (Midtrans, Stripe, etc.)
    // For this mockup, we'll simulate a successful payment
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          transactionId,
          paymentMethod,
          message: 'Payment processed successfully'
        });
      }, 1000);
    });
  }
}

export default PaymentService;
