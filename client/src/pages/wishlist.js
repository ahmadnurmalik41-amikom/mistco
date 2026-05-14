import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderProductGrid } from '../components/product-grid.js';
import { getWishlist } from '../services/wishlist-service.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNavbar()}
    <main class="min-h-screen pt-24 pb-16 bg-[var(--bg-primary)]">
      <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        <div class="flex items-center gap-4 mb-10 border-b border-[var(--border-color)] pb-4">
          <svg class="w-8 h-8 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          <h1 class="text-4xl font-black font-heading tracking-tight uppercase">My Wishlist</h1>
        </div>
        
        <div id="wishlist-grid" class="w-full">
          <div class="flex justify-center items-center py-20">
            <div class="w-10 h-10 border-4 border-[var(--brand-accent)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  initNavbar();
  
  try {
    const wishlistItems = await getWishlist();
    const container = document.getElementById('wishlist-grid');
    
    if (wishlistItems.length === 0) {
      container.innerHTML = `
        <div class="text-center py-20 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
          <svg class="w-20 h-20 mx-auto text-[var(--text-muted)] mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          <h2 class="text-2xl font-bold mb-3 text-[var(--text-primary)]">Your wishlist is empty</h2>
          <p class="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">Looks like you haven't added anything to your wishlist yet. Explore our collection and find your new favorites.</p>
          <a href="/pages/pria.html" class="inline-block bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-3 rounded-full font-bold hover:bg-[var(--brand-accent)] hover:text-white transition-colors duration-300">
            Explore Collection
          </a>
        </div>
      `;
    } else {
      renderProductGrid(wishlistItems, 'wishlist-grid');
    }
  } catch (error) {
    document.getElementById('wishlist-grid').innerHTML = `
      <div class="text-center py-10 text-red-500 bg-red-500/10 rounded-lg">
        Failed to load wishlist. Please try again later.
      </div>
    `;
  }
});