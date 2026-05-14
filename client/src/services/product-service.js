import api from '../api/axios.js';
import { hoodieData } from '../data/hoodie.js';
import { kaosData } from '../data/kaos.js';
import { celanaData } from '../data/celana.js';
import { muslimData } from '../data/muslim.js';
import { workshirtData } from '../data/workshirt.js';

const allMockData = [...hoodieData, ...kaosData, ...celanaData, ...muslimData, ...workshirtData];

export const getProducts = async (category = '') => {
  try {
    // Try to get from API first
    const url = category ? `/products?category=${category}` : '/products';
    const response = await api.get(url);
    if (response.data.success && response.data.data.length > 0) {
      return response.data.data;
    }
  } catch (error) {
    console.warn('API fetch failed, falling back to mock data', error);
  }

  // Fallback to mock data if API fails or returns empty
  return new Promise(resolve => {
    setTimeout(() => {
      if (category) {
        resolve(allMockData.filter(p => p.category === category));
      } else {
        resolve(allMockData);
      }
    }, 500); // Simulate network delay
  });
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.warn('API fetch failed, falling back to mock data', error);
  }

  // Fallback
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(allMockData.find(p => p.id == id));
    }, 500);
  });
};

export const searchProducts = async (keyword) => {
  try {
    const response = await api.get(`/products?search=${keyword}`);
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.warn('API fetch failed, falling back to mock data', error);
  }

  return new Promise(resolve => {
    setTimeout(() => {
      const lowerKeyword = keyword.toLowerCase();
      resolve(allMockData.filter(p => p.name.toLowerCase().includes(lowerKeyword)));
    }, 500);
  });
};
