import express from 'express';
import { getTransactions, getTransactionById } from '../controllers/transaction-controller.js';
import { authenticate } from '../middleware/auth-middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getTransactions);
router.get('/:id', getTransactionById);

export default router;
