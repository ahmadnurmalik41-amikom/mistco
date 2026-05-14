import express from 'express';
import { processCheckout } from '../controllers/checkout-controller.js';
import { authenticate } from '../middleware/auth-middleware.js';

const router = express.Router();

router.post('/', authenticate, processCheckout);

export default router;
