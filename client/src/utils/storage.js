export const Storage = {
  setToken: (token) => localStorage.setItem('mist_token', token),
  getToken: () => localStorage.getItem('mist_token'),
  removeToken: () => localStorage.removeItem('mist_token'),
  
  setUser: (user) => localStorage.setItem('mist_user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('mist_user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('mist_user'),
  
  isAuthenticated: () => !!localStorage.getItem('mist_token'),

  // Fallback local cart if API not available
  getLocalCart: () => {
    const cart = localStorage.getItem('mist_local_cart');
    return cart ? JSON.parse(cart) : [];
  },
  setLocalCart: (cart) => localStorage.setItem('mist_local_cart', JSON.stringify(cart)),

  // Fallback local wishlist if API not available
  getLocalWishlist: () => {
    const wishlist = localStorage.getItem('mist_local_wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  },
  setLocalWishlist: (wishlist) => localStorage.setItem('mist_local_wishlist', JSON.stringify(wishlist))
};
