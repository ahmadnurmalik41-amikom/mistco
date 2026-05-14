import Transaction from '../models/Transaction.js';
import { sendSuccess } from '../utils/response.js';

export const getTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.findByUserId(userId);
    sendSuccess(res, 200, 'Transactions retrieved successfully', transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const transaction = await Transaction.findById(id, userId);
    
    if (!transaction) {
      throw { statusCode: 404, message: 'Transaction not found' };
    }

    sendSuccess(res, 200, 'Transaction retrieved successfully', transaction);
  } catch (error) {
    next(error);
  }
};
