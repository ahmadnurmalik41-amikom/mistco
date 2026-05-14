import { searchProducts as getProductsSearch } from './product-service.js';

export const searchProducts = async (keyword) => {
  return await getProductsSearch(keyword);
};
