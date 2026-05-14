import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { getProductById } from '../services/product-service.js';
import { addToCart } from '../services/cart-service.js';
import { formatRupiah } from '../utils/currency.js';
import { getQueryParam } from '../utils/query.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('app');
  const productId = getQueryParam('id');

  if (!productId) {
    window.location.href = '/pages/404.html';
    return;
  }

  // Initial skeleton render
  app.innerHTML = `
    ${renderNavbar()}
    <main class="pt-24 pb-16 min-h-screen">
      <div class="container mx-auto px-4">
        <div class="animate-pulse flex flex-col md:flex-row gap-12">
          <div class="w-full md:w-1/2 h-96 bg-[var(--bg-tertiary)] rounded-2xl"></div>
          <div class="w-full md:w-1/2 space-y-4">
            <div class="h-10 bg-[var(--bg-tertiary)] rounded w-3/4"></div>
            <div class="h-6 bg-[var(--bg-tertiary)] rounded w-1/4"></div>
            <div class="h-32 bg-[var(--bg-tertiary)] rounded w-full mt-8"></div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
  initNavbar();

  try {
    const product = await getProductById(productId);
    
    if (!product) {
      window.location.href = '/pages/404.html';
      return;
    }

    // Actual render
    app.innerHTML = `
      ${renderNavbar()}
      <main class="pt-24 pb-24 min-h-screen">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row gap-12 lg:gap-20">
            <!-- Product Image -->
            <div class="w-full md:w-1/2">
              <div class="relative aspect-[4/5] bg-[var(--bg-tertiary)] rounded-2xl overflow-hidden shadow-lg border border-[var(--border-color)]">
                <img src="${product.image || product.image_url}" alt="${product.name}" class="w-full h-full object-cover object-center">
                ${product.isNew ? '<span class="absolute top-4 left-4 bg-[var(--brand-accent)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">New Arrival</span>' : ''}
              </div>
            </div>

            <!-- Product Info -->
            <div class="w-full md:w-1/2 flex flex-col pt-4 md:pt-10">
              <nav class="flex text-sm text-[var(--text-muted)] mb-4">
                <a href="/" class="hover:text-[var(--brand-accent)]">Home</a>
                <span class="mx-2">/</span>
                <a href="/pages/${product.category}.html" class="hover:text-[var(--brand-accent)] capitalize">${product.category}</a>
                <span class="mx-2">/</span>
                <span class="text-[var(--text-primary)] truncate">${product.name}</span>
              </nav>

              <h1 class="text-3xl md:text-5xl font-heading font-bold mb-4 text-[var(--text-primary)]">${product.name}</h1>
              <p class="text-2xl font-bold text-[var(--brand-accent)] mb-8">${formatRupiah(product.price)}</p>

              <div class="mb-8">
                <h3 class="font-bold mb-3 text-[var(--text-primary)]">Select Size</h3>
                <div class="flex gap-3">
                  <button class="size-btn w-12 h-12 rounded border-2 border-[var(--brand-accent)] text-[var(--brand-accent)] font-medium hover:bg-[var(--brand-accent)] hover:text-white transition-colors" data-size="S">S</button>
                  <button class="size-btn w-12 h-12 rounded border-2 border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:border-[var(--brand-accent)] transition-colors bg-[var(--brand-accent)] text-white" data-size="M">M</button>
                  <button class="size-btn w-12 h-12 rounded border-2 border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:border-[var(--brand-accent)] transition-colors" data-size="L">L</button>
                  <button class="size-btn w-12 h-12 rounded border-2 border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:border-[var(--brand-accent)] transition-colors" data-size="XL">XL</button>
                </div>
              </div>

              <div class="flex gap-4 mb-10">
                <div class="flex items-center border border-[var(--border-color)] rounded-lg">
                  <button id="qty-minus" class="w-12 h-14 flex justify-center items-center hover:bg-[var(--bg-secondary)] rounded-l-lg transition-colors">-</button>
                  <input type="number" id="qty-input" value="1" min="1" max="10" class="w-16 h-14 text-center bg-transparent border-x border-[var(--border-color)] font-bold outline-none appearance-none">
                  <button id="qty-plus" class="w-12 h-14 flex justify-center items-center hover:bg-[var(--bg-secondary)] rounded-r-lg transition-colors">+</button>
                </div>
                
                <button id="add-to-cart-detail" class="flex-1 btn btn-primary text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Add to Cart
                </button>
              </div>

              <div class="border-t border-[var(--border-color)] pt-8">
                <h3 class="font-bold mb-4 font-heading text-lg">Product Description</h3>
                <p class="text-[var(--text-secondary)] leading-relaxed">
                  ${product.description || 'Premium quality apparel from MIST.CO. Designed for maximum comfort and contemporary style. Made from selected materials to ensure durability and a perfect fit.'}
                </p>
                
                <ul class="mt-6 space-y-2 text-[var(--text-secondary)]">
                  <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Premium materials
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Exclusive MIST.CO design
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Durable stitching
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </main>
      ${renderFooter()}
    `;
    
    initNavbar();

    // Logic for Size selection
    let selectedSize = 'M';
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.size-btn').forEach(b => {
          b.classList.remove('border-[var(--brand-accent)]', 'text-[var(--brand-accent)]', 'bg-[var(--brand-accent)]', 'text-white');
          b.classList.add('border-[var(--border-color)]', 'text-[var(--text-primary)]');
        });
        e.target.classList.remove('border-[var(--border-color)]', 'text-[var(--text-primary)]');
        e.target.classList.add('border-[var(--brand-accent)]', 'bg-[var(--brand-accent)]', 'text-white');
        selectedSize = e.target.dataset.size;
      });
    });

    // Logic for Qty
    const qtyInput = document.getElementById('qty-input');
    document.getElementById('qty-minus').addEventListener('click', () => {
      if(qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
      if(qtyInput.value < 10) qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    // Logic Add to Cart
    document.getElementById('add-to-cart-detail').addEventListener('click', async () => {
      try {
        await addToCart(product, parseInt(qtyInput.value), selectedSize);
        initNavbar(); // refresh cart count
        alert(`${qtyInput.value}x ${product.name} (Size: ${selectedSize}) added to cart!`);
      } catch (err) {
        alert('Failed to add to cart');
      }
    });

  } catch (error) {
    console.error('Error rendering product detail:', error);
  }
});
