import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderCheckoutForm } from '../components/checkout-form.js';
import { getCart } from '../services/cart-service.js';
import { formatRupiah } from '../utils/currency.js';
import { generateWhatsAppLink } from '../utils/whatsapp.js';
import { Storage } from '../utils/storage.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', async () => {
  // Check authentication
  if (!Storage.isAuthenticated()) {
    window.location.href = '/pages/login.html?redirect=' + encodeURIComponent(window.location.pathname);
    return;
  }

  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNavbar()}
    <main class="container mx-auto px-4 py-24 min-h-screen bg-[var(--bg-secondary)]">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-heading font-bold mb-8">Checkout</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <!-- Checkout Form -->
          <div>
            ${renderCheckoutForm()}
          </div>

          <!-- Order Summary Sidebar -->
          <div>
            <div class="bg-[var(--bg-primary)] p-8 rounded-xl border border-[var(--border-color)] sticky top-28">
              <h3 class="text-2xl font-heading font-bold mb-6 pb-4 border-b border-[var(--border-color)]">Your Order</h3>
              <div id="checkout-items" class="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                <!-- Items injected here -->
              </div>
              
              <div class="space-y-4 pt-6 border-t border-[var(--border-color)] text-[var(--text-secondary)]">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span id="checkout-subtotal" class="font-medium text-[var(--text-primary)]">Rp 0</span>
                </div>
                <div class="flex justify-between">
                  <span>Shipping</span>
                  <span id="checkout-shipping" class="font-medium text-[var(--text-primary)]">Rp 0</span>
                </div>
                <div class="border-t border-[var(--border-color)] pt-4 mt-4 flex justify-between">
                  <span class="text-lg font-bold text-[var(--text-primary)]">Total to Pay</span>
                  <span id="checkout-total" class="text-2xl font-bold text-[var(--brand-accent)]">Rp 0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  initNavbar();

  // Load checkout data
  const cart = await getCart();
  if (!cart || cart.length === 0) {
    window.location.href = '/pages/cart.html';
    return;
  }

  const itemsContainer = document.getElementById('checkout-items');
  itemsContainer.innerHTML = cart.map(item => `
    <div class="flex items-center gap-4">
      <img src="${item.image_url}" class="w-16 h-16 object-cover rounded bg-[var(--bg-tertiary)]">
      <div class="flex-1">
        <h4 class="font-medium text-sm line-clamp-2">${item.name}</h4>
        <p class="text-xs text-[var(--text-muted)]">Size: ${item.size} | Qty: ${item.quantity}</p>
      </div>
      <div class="font-bold text-sm">${formatRupiah(item.price * item.quantity)}</div>
    </div>
  `).join('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 50000;
  const total = subtotal + shipping;

  document.getElementById('checkout-subtotal').textContent = formatRupiah(subtotal);
  document.getElementById('checkout-shipping').textContent = formatRupiah(shipping);
  document.getElementById('checkout-total').textContent = formatRupiah(total);

  // Form submission handling
  const form = document.getElementById('checkoutForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    const address = document.getElementById('address').value;
    const paymentMethod = form.querySelector('input[name="paymentMethod"]:checked').value;

    try {
      // Import the service specifically for this action
      const { processCheckout } = await import('../services/checkout-service.js');
      
      const payload = {
        totalAmount: total,
        shippingAddress: address,
        paymentMethod,
        items: cart.map(i => ({ product_id: i.product_id, quantity: i.quantity, price: i.price, size: i.size }))
      };

      // Since we don't have a real backend fully hooked up to the DB seeded yet during dev,
      // we'll simulate the WhatsApp redirect flow
      
      const transactionId = 'MIST-' + Math.floor(Math.random() * 100000);
      
      // Clear cart locally since we mock checkout for now
      const { clearCart } = await import('../services/cart-service.js');
      await clearCart();
      
      const waLink = generateWhatsAppLink(transactionId, total, address);
      
      // Redirect to WhatsApp
      window.location.href = waLink;
      
    } catch (error) {
      alert('Checkout failed. Please try again.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
});
