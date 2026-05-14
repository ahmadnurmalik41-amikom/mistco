import express from 'express';
import { upload } from '../middleware/upload-middleware.js';
import { authenticate, authorizeAdmin } from '../middleware/auth-middleware.js';
import { sendSuccess } from '../utils/response.js';

const router = express.Router();

router.post('/', authenticate, authorizeAdmin, upload.single('image'), (req, res, next) => {
  try {
    if (!req.file) {
      throw { statusCode: 400, message: 'No file uploaded' };
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    sendSuccess(res, 201, 'File uploaded successfully', { imageUrl });
  } catch (error) {
    next(error);
  }
});

export default router;
