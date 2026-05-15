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
    <main class="container mx-auto px-4 py-32 min-h-screen">
      <h1 class="text-4xl font-heading font-black mb-12 tracking-tighter">Your <span class="text-[var(--brand-accent)]">Cart</span></h1>
      
      <div id="cart-content" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Content will be loaded here -->
        <div class="lg:col-span-2 space-y-4">
           <div class="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
           <div class="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  initNavbar();
  
  const loadCart = async () => {
    const cart = await getCart();
    const container = document.getElementById('cart-content');
    
    if (!cart || cart.length === 0) {
      container.innerHTML = `
        <div class="lg:col-span-3 text-center py-24 bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-color)]">
          <div class="w-24 h-24 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--text-muted)]">
             <i class="ri-shopping-cart-2-line text-4xl"></i>
          </div>
          <h2 class="text-3xl font-heading font-bold mb-4">Your cart is empty</h2>
          <p class="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our latest collection!</p>
          <a href="/" class="px-10 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all inline-block">Start Shopping</a>
        </div>
      `;
      return;
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 50000;
    const total = subtotal + shipping;

    container.innerHTML = `
      <div class="lg:col-span-2 space-y-6">
        ${cart.map(item => `
          <div class="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-color)] flex flex-col md:flex-row items-center gap-6 group hover:border-[var(--brand-accent)] transition-all duration-300">
            <img src="${item.image_url}" class="w-24 h-24 object-cover rounded-xl bg-[var(--bg-secondary)]">
            
            <div class="flex-1 text-center md:text-left">
              <h3 class="font-bold text-lg mb-1">${item.name}</h3>
              <p class="text-[10px] text-[var(--text-muted)] uppercase font-black tracking-widest mb-2">Size: ${item.size}</p>
              <p class="font-black text-[var(--brand-accent)]">${formatRupiah(item.price)}</p>
            </div>

            <div class="flex items-center gap-4 bg-[var(--bg-secondary)] p-2 rounded-xl border border-[var(--border-color)]">
              <button class="qty-minus w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center transition-colors" data-id="${item.id}">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
              </button>
              <span class="w-8 text-center font-bold">${item.quantity}</span>
              <button class="qty-plus w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center transition-colors" data-id="${item.id}">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              </button>
            </div>

            <div class="text-right hidden md:block w-32">
              <p class="font-black text-lg mb-1">${formatRupiah(item.price * item.quantity)}</p>
              <button class="remove-item text-red-500 hover:opacity-70 text-[10px] font-black uppercase tracking-widest" data-id="${item.id}">Remove</button>
            </div>

            <button class="remove-item md:hidden w-full py-3 text-red-500 font-bold border-t border-[var(--border-color)]" data-id="${item.id}">Remove Item</button>
          </div>
        `).join('')}
      </div>

      <div class="lg:col-span-1">
        <div class="bg-[var(--bg-primary)] p-8 rounded-3xl border border-[var(--border-color)] sticky top-32">
          <h3 class="text-xl font-heading font-black mb-8">Order <span class="text-[var(--brand-accent)]">Summary</span></h3>
          
          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-sm">
              <span class="text-[var(--text-muted)]">Subtotal</span>
              <span class="font-bold">${formatRupiah(subtotal)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-[var(--text-muted)]">Shipping</span>
              <span class="font-bold">${formatRupiah(shipping)}</span>
            </div>
            <div class="pt-4 border-t border-[var(--border-color)] flex justify-between items-end">
              <div>
                <p class="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Total to Pay</p>
                <p class="text-3xl font-black text-[var(--brand-accent)]">${formatRupiah(total)}</p>
              </div>
            </div>
          </div>

          <a href="/pages/checkout.html" id="checkout-action" class="w-full py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all text-center block shadow-lg shadow-indigo-100">
            Checkout Now
          </a>
          
          <p class="mt-6 text-center text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <i class="ri-shield-check-line text-lg text-green-500"></i>
            Secure Checkout Guaranteed
          </p>
        </div>
      </div>
    `;

    attachCartListeners(cart);
  };

  const attachCartListeners = (cart) => {
    // Checkout check
    const checkoutBtn = document.getElementById('checkout-action');
    checkoutBtn?.addEventListener('click', (e) => {
      if (!Storage.isAuthenticated()) {
        e.preventDefault();
        showToast('Please login to proceed with checkout', 'info');
        setTimeout(() => {
          window.location.href = '/pages/login.html?redirect=/pages/checkout.html';
        }, 1500);
      }
    });

    // Plus
    document.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const item = cart.find(i => i.id == id);
        if (item) {
          await updateQuantity(id, item.quantity + 1);
          await loadCart();
          initNavbar(); // Update count in header
        }
      });
    });

    // Minus
    document.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const item = cart.find(i => i.id == id);
        if (item && item.quantity > 1) {
          await updateQuantity(id, item.quantity - 1);
          await loadCart();
          initNavbar();
        }
      });
    });

    // Remove
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        await removeFromCart(id);
        await loadCart();
        initNavbar();
        showToast('Item removed from cart', 'success');
      });
    });
  };

  await loadCart();
});
