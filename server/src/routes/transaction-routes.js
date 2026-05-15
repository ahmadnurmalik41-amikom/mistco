import express from 'express';
import { getTransactions, getTransactionById, getAllTransactions, updateTransactionStatus } from '../controllers/transaction-controller.js';
import { authenticate, authorizeAdmin } from '../middleware/auth-middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getTransactions);
router.get('/:id', getTransactionById);

// Admin Routes
router.get('/admin/all', authorizeAdmin, getAllTransactions);
router.put('/admin/status/:id', authorizeAdmin, updateTransactionStatus);

export default router;
