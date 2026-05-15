import ProductService from '../services/product-service.js';
import { sendSuccess } from '../utils/response.js';

export const getProducts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let products;

    if (search) {
      products = await ProductService.searchProducts(search);
    } else {
      products = await ProductService.getAllProducts(category);
    }

    sendSuccess(res, 200, 'Products retrieved successfully', products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    sendSuccess(res, 200, 'Product retrieved successfully', product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const id = await ProductService.createProduct(req.body);
    sendSuccess(res, 201, 'Product created successfully', { id });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductService.updateProduct(id, req.body);
    sendSuccess(res, 200, 'Product updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    sendSuccess(res, 200, 'Product deleted successfully');
  } catch (error) {
    next(error);
  }
};
