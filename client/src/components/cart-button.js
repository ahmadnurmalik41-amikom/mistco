import { getCart, removeFromCart, updateQuantity } from '../services/cart-service.js';
import { formatRupiah } from '../utils/currency.js';
import { initNavbar } from './navbar.js';

export const renderCartList = async (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cart = await getCart();
  
  if (!cart || cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
        <svg class="w-20 h-20 mx-auto text-[var(--text-muted)] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        <h3 class="text-2xl font-heading font-semibold mb-2">Your Cart is Empty</h3>
        <p class="text-[var(--text-secondary)] mb-8">Looks like you haven't added anything yet.</p>
        <a href="/" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    updateCartTotals([]);
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl mb-4 relative group hover:border-[var(--brand-accent)] transition-colors">
      <img src="${item.image_url}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg bg-[var(--bg-tertiary)]">
      
      <div class="flex-1 text-center sm:text-left">
        <h4 class="font-heading font-semibold text-lg mb-1">${item.name}</h4>
        <p class="text-[var(--text-secondary)] text-sm mb-2">Size: ${item.size}</p>
        <p class="font-bold text-[var(--brand-accent)]">${formatRupiah(item.price)}</p>
      </div>

      <div class="flex items-center gap-3 bg-[var(--bg-secondary)] p-1 rounded-lg border border-[var(--border-color)]">
        <button class="w-8 h-8 flex items-center justify-center text-[var(--text-primary)] hover:bg-white rounded shadow-sm transition-colors qty-btn" data-action="minus" data-id="${item.id}">-</button>
        <span class="w-8 text-center font-medium">${item.quantity}</span>
        <button class="w-8 h-8 flex items-center justify-center text-[var(--text-primary)] hover:bg-white rounded shadow-sm transition-colors qty-btn" data-action="plus" data-id="${item.id}">+</button>
      </div>

      <div class="w-full sm:w-auto text-right">
        <p class="font-bold text-lg hidden sm:block mb-2">${formatRupiah(item.price * item.quantity)}</p>
        <button class="text-red-500 hover:text-red-700 text-sm font-medium remove-btn flex items-center justify-center w-full sm:w-auto gap-1" data-id="${item.id}">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          Remove
        </button>
      </div>
    </div>
  `).join('');

  updateCartTotals(cart);

  // Attach Listeners
  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const item = cart.find(i => i.id == id);
      if (!item) return;

      let newQty = item.quantity;
      if (action === 'plus') newQty++;
      if (action === 'minus' && newQty > 1) newQty--;

      if (newQty !== item.quantity) {
        await updateQuantity(id, newQty);
        initNavbar();
        renderCartList(containerId);
      }
    });
  });

  container.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = btn.dataset.id;
      await removeFromCart(id);
      initNavbar();
      renderCartList(containerId);
    });
  });
};

const updateCartTotals = (cart) => {
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (subtotalEl && totalEl) {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 50000 : 0; // Fixed shipping for mockup
    const total = subtotal + shipping;

    subtotalEl.textContent = formatRupiah(subtotal);
    document.getElementById('cart-shipping').textContent = formatRupiah(shipping);
    totalEl.textContent = formatRupiah(total);

    if (checkoutBtn) {
      checkoutBtn.disabled = cart.length === 0;
      if (cart.length === 0) checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
      else checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
};
