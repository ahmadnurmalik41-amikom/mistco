import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { getCart, removeFromCart, updateQuantity } from '../services/cart-service.js';
import { formatRupiah } from '../utils/currency.js';
import { Storage } from '../utils/storage.js';
import { showToast } from '../utils/toast.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNavbar()}
    <main class="container mx-auto px-4 py-24 min-h-screen">
      <h1 class="text-4xl font-heading font-bold mb-8">Shopping Cart</h1>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-2">
          <div id="cart-items-container">
            <!-- Items rendered by JS -->
          </div>
        </div>
        <div class="lg:col-span-1">
          <div class="bg-[var(--bg-secondary)] p-8 rounded-xl border border-[var(--border-color)] sticky top-28">
            <h3 class="text-2xl font-heading font-bold mb-6 pb-4 border-b border-[var(--border-color)]">Order Summary</h3>
            <div class="space-y-4 mb-6 text-[var(--text-secondary)]">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span id="cart-subtotal" class="font-medium text-[var(--text-primary)]">Rp 0</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping Estimate</span>
                <span id="cart-shipping" class="font-medium text-[var(--text-primary)]">Rp 0</span>
              </div>
              <div class="border-t border-[var(--border-color)] pt-4 mt-4 flex justify-between">
                <span class="text-lg font-bold text-[var(--text-primary)]">Total</span>
                <span id="cart-total" class="text-xl font-bold text-[var(--brand-accent)]">Rp 0</span>
              </div>
            </div>
            <a href="/pages/checkout.html" id="checkout-btn" class="btn btn-primary w-full text-center py-4 text-lg shadow-lg hover:shadow-xl">Proceed to Checkout</a>
            <p class="text-xs text-center text-[var(--text-muted)] mt-4 flex items-center justify-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  initNavbar();

  // Add checkout click handler
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      if (!Storage.isAuthenticated()) {
        e.preventDefault();
        showToast('Please login to proceed with checkout', 'info');
        setTimeout(() => {
          window.location.href = '/pages/login.html?redirect=/pages/checkout.html';
        }, 1500);
      }
    });
  }
  
  // Need to import renderCartList directly in the page to handle scoping
  const { renderCartList } = await import('../components/cart-button.js');
  await renderCartList('cart-items-container');
});
