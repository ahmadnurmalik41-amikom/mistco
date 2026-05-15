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

export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();
    sendSuccess(res, 200, 'All transactions retrieved successfully', transactions);
  } catch (error) {
    next(error);
  }
};

export const updateTransactionStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Transaction.updateStatus(id, status);
    sendSuccess(res, 200, 'Transaction status updated successfully');
  } catch (error) {
    next(error);
  }
};
