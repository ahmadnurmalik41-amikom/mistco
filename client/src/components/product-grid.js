import { renderProductCard } from './product-card.js';
import { addToCart } from '../services/cart-service.js';
import { initNavbar } from './navbar.js'; // To update cart count
import { showToast } from '../utils/toast.js';

export const renderProductGrid = async (products, containerId = 'product-grid') => {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Fetch wishlist state to show filled hearts
  const { getWishlist } = await import('../services/wishlist-service.js');
  const wishlist = await getWishlist();
  const wishIds = new Set(wishlist.map(i => i.id.toString()));

  if (!products || products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-[var(--text-muted)]">
        <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
        <p class="text-xl">No products found</p>
      </div>
    `;
    return;
  }

  container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8';
  container.innerHTML = products.map(p => renderProductCard(p, wishIds.has(p.id.toString()))).join('');

  // Attach event listeners
  const addButtons = container.querySelectorAll('.add-to-cart-btn');
  addButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image
      };
      
      try {
        await addToCart(product, 1, 'M'); // Default size M for quick add
        initNavbar(); // Update count
        showToast(`${product.name} added to cart!`);
      } catch (error) {
        showToast('Failed to add to cart', 'error');
      }
    });
  });

  const wishlistButtons = container.querySelectorAll('.add-to-wishlist-btn');
  wishlistButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const cartBtn = btn.parentElement.querySelector('.add-to-cart-btn');
      const product = {
        id: cartBtn.dataset.id,
        name: cartBtn.dataset.name,
        price: parseFloat(cartBtn.dataset.price),
        image: cartBtn.dataset.image
      };
      
      try {
        const { toggleWishlist } = await import('../services/wishlist-service.js');
        const result = await toggleWishlist(product);
        
        if (result.action === 'added') {
          showToast(`${product.name} added to wishlist!`);
          btn.innerHTML = `<svg class="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`;
        } else {
          showToast(`${product.name} removed from wishlist!`);
          btn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`;
          
          // If on wishlist page, remove the card
          if (window.location.pathname.includes('wishlist.html')) {
            const card = btn.closest('.card');
            card.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-300');
            setTimeout(() => {
              card.remove();
              if (container.querySelectorAll('.card').length === 0) {
                window.location.reload();
              }
            }, 300);
          }
        }
      } catch (error) {
        showToast('Action failed', 'error');
      }
    });
  });
};
