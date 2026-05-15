import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product-controller.js';
import { authenticate, authorizeAdmin } from '../middleware/auth-middleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin Routes
router.post('/', authenticate, authorizeAdmin, createProduct);
router.put('/:id', authenticate, authorizeAdmin, updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

export default router;
