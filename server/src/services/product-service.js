import Product from '../models/Product.js';

class ProductService {
  static async getAllProducts(category) {
    return await Product.findAll(category);
  }

  static async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw { statusCode: 404, message: 'Product not found' };
    }
    return product;
  }

  static async searchProducts(keyword) {
    return await Product.search(keyword);
  }
}

export default ProductService;
