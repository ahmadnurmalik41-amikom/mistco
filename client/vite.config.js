import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'pages/about.html'),
        cart: resolve(__dirname, 'pages/cart.html'),
        celana: resolve(__dirname, 'pages/celana.html'),
        checkout: resolve(__dirname, 'pages/checkout.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
        faq: resolve(__dirname, 'pages/faq.html'),
        hoodie: resolve(__dirname, 'pages/hoodie.html'),
        kaos: resolve(__dirname, 'pages/kaos.html'),
        login: resolve(__dirname, 'pages/login.html'),
        muslim: resolve(__dirname, 'pages/muslim.html'),
        productDetail: resolve(__dirname, 'pages/product-detail.html'),
        profile: resolve(__dirname, 'pages/profile.html'),
        register: resolve(__dirname, 'pages/register.html'),
        search: resolve(__dirname, 'pages/search.html'),
        sizeGuide: resolve(__dirname, 'pages/size-guide.html'),
        transaction: resolve(__dirname, 'pages/transaction.html'),
        wishlist: resolve(__dirname, 'pages/wishlist.html'),
        workshirt: resolve(__dirname, 'pages/workshirt.html'),
        notFound: resolve(__dirname, 'pages/404.html'),
        adminDashboard: resolve(__dirname, 'pages/admin-dashboard.html'),
        adminProducts: resolve(__dirname, 'pages/admin-products.html'),
        adminOrders: resolve(__dirname, 'pages/admin-orders.html'),
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});
