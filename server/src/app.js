import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error-middleware.js';

// Routes
import authRoutes from './routes/auth-routes.js';
import productRoutes from './routes/product-routes.js';
import cartRoutes from './routes/cart-routes.js';
import checkoutRoutes from './routes/checkout-routes.js';
import transactionRoutes from './routes/transaction-routes.js';
import wishlistRoutes from './routes/wishlist-routes.js';
import uploadRoutes from './routes/upload-routes.js';

const app = express();

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handler
app.use(errorHandler);

export default app;
