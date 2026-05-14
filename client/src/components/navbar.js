import { Storage } from '../utils/storage.js';

export const renderNavbar = () => {
  const user = Storage.getUser();
  const authLinks = user 
    ? `<a href="/pages/profile.html" class="hover:text-[var(--brand-accent)] flex items-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> ${user.name}</a>
       <button id="logoutBtn" class="hover:text-red-500 text-sm">Logout</button>`
    : `<a href="/pages/login.html" class="hover:text-[var(--brand-accent)] font-medium">Login</a>`;

  return `
    <header class="glass fixed w-full top-0 z-50 transition-all duration-300" id="main-nav">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <a href="/" class="flex items-center gap-2">
            <span class="font-heading font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-accent)] to-purple-400">MIST.CO</span>
          </a>

          <!-- Desktop Menu -->
          <nav class="hidden md:flex space-x-8">
            <a href="/pages/hoodie.html" class="font-medium hover:text-[var(--brand-accent)] transition-colors">Hoodies</a>
            <a href="/pages/kaos.html" class="font-medium hover:text-[var(--brand-accent)] transition-colors">T-Shirts</a>
            <a href="/pages/celana.html" class="font-medium hover:text-[var(--brand-accent)] transition-colors">Pants</a>
            <a href="/pages/muslim.html" class="font-medium hover:text-[var(--brand-accent)] transition-colors">Muslim Wear</a>
            <a href="/pages/workshirt.html" class="font-medium hover:text-[var(--brand-accent)] transition-colors">Workshirts</a>
          </nav>

          <!-- Icons -->
          <div class="flex items-center space-x-6">
            <button id="searchTrigger" class="hover:text-[var(--brand-accent)] transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
            <a href="/pages/wishlist.html" class="hover:text-[var(--brand-accent)] transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </a>
            <a href="/pages/cart.html" class="hover:text-[var(--brand-accent)] transition-colors relative">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span id="cart-count" class="absolute -top-2 -right-2 bg-[var(--brand-accent)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </a>
            
            <div class="hidden md:flex items-center space-x-4 ml-4 border-l pl-4 border-[var(--border-color)]">
              ${authLinks}
            </div>

            <!-- Mobile menu button -->
            <button id="mobileMenuBtn" class="md:hidden">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Header search overlay -->
      <div id="searchOverlay" class="absolute inset-0 bg-[var(--bg-primary)] z-50 hidden opacity-0 transition-opacity duration-300">
        <div class="container mx-auto px-4 h-full flex items-center justify-center relative">
          <form id="searchForm" action="/pages/search.html" class="w-full max-w-2xl mx-auto">
            <div class="relative w-full">
              <input type="text" name="q" placeholder="Search products..." class="w-full text-lg bg-transparent border-b border-[var(--border-color)] focus:border-[var(--brand-accent)] outline-none py-2 pr-10 text-[var(--text-primary)] font-heading transition-colors" autofocus>
              <button type="submit" class="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--brand-accent)]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </div>
          </form>
          <button id="closeSearch" class="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
    </header>
  `;
};

export const initNavbar = () => {
  // Update cart count
  import('../services/cart-service.js').then(module => {
    module.getCart().then(cart => {
      const items = cart || [];
      const count = items.reduce((acc, item) => acc + item.quantity, 0);
      const countEl = document.getElementById('cart-count');
      if (countEl) {
        countEl.textContent = count;
        // Optional: hide the badge if 0
        if (count === 0) countEl.classList.add('hidden');
        else countEl.classList.remove('hidden');
      }
    });
  });

  // Search Toggle
  const searchTrigger = document.getElementById('searchTrigger');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = searchOverlay?.querySelector('input');

  if (searchTrigger && searchOverlay) {
    searchTrigger.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
      setTimeout(() => {
        searchOverlay.classList.remove('opacity-0');
        searchInput?.focus();
      }, 10);
    });

    closeSearch?.addEventListener('click', () => {
      searchOverlay.classList.add('opacity-0');
      setTimeout(() => {
        searchOverlay.classList.add('hidden');
      }, 300);
    });
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const { showConfirm } = await import('../utils/modal.js');
      const { showToast } = await import('../utils/toast.js');
      
      const confirmed = await showConfirm(
        'You will need to sign in again to access your account and orders.',
        'Ready to Logout?',
        'Logout',
        'danger'
      );

      if (confirmed) {
        showToast('Logging out...', 'info');
        const module = await import('../services/auth-service.js');
        module.logout();
      }
    });
  }

  // Scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) {
      if (window.scrollY > 20) {
        nav.classList.add('shadow-md');
      } else {
        nav.classList.remove('shadow-md');
      }
    }
  });
};
