import { formatRupiah } from '../utils/currency.js';

export const renderProductCard = (product, isWishlisted = false) => {
  const isNew = product.isNew ? `<span class="absolute top-4 left-4 bg-[var(--brand-accent)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">New</span>` : '';
  const stockInfo = product.stock <= 5 && product.stock > 0 
    ? `<span class="text-orange-500 text-xs mt-1 block">Only ${product.stock} left!</span>` 
    : '';

  const heartIcon = isWishlisted 
    ? `<svg class="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`
    : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`;

  return `
    <div class="card group hover-lift animate-fade-in">
      <a href="/pages/product-detail.html?id=${product.id}" class="block relative aspect-[4/5] bg-[var(--bg-secondary)] overflow-hidden">
        ${isNew}
        <img src="${product.image || product.image_url}" alt="${product.name}" class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" loading="lazy">
        
        <!-- Quick Actions Overlay -->
        <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black/60 to-transparent flex gap-2">
          <button class="add-to-cart-btn flex-1 bg-white text-black font-medium py-2 rounded shadow hover:bg-[var(--brand-accent)] hover:text-white transition-colors" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image || product.image_url}">
            Add to Cart
          </button>
          <button class="add-to-wishlist-btn w-10 h-10 bg-white text-black rounded shadow flex items-center justify-center hover:text-red-500 transition-colors" data-id="${product.id}">
            ${heartIcon}
          </button>
        </div>
      </a>
      <div class="p-5">
        <div class="flex justify-between items-start mb-2">
          <a href="/pages/product-detail.html?id=${product.id}">
            <h3 class="font-heading font-semibold text-lg text-[var(--text-primary)] group-hover:text-[var(--brand-accent)] transition-colors line-clamp-1">${product.name}</h3>
          </a>
        </div>
        <div class="flex items-center justify-between mt-2">
          <p class="font-bold text-xl">${formatRupiah(product.price)}</p>
        </div>
        ${stockInfo}
      </div>
    </div>
  `;
};
