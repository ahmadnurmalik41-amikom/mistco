import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { Storage } from '../utils/storage.js';
import { formatRupiah } from '../utils/currency.js';
import { showToast } from '../utils/toast.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', async () => {
  if (!Storage.isAuthenticated()) {
    window.location.href = '/pages/login.html';
    return;
  }

  const app = document.getElementById('app');
  let transactions = [];

  const renderTransactions = () => {
    const listContainer = document.getElementById('transaction-list');
    if (transactions.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-20 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)]">
          <i class="ri-history-line text-6xl text-[var(--text-muted)] mb-4"></i>
          <h3 class="text-xl font-bold mb-2">No transactions yet</h3>
          <p class="text-[var(--text-muted)] mb-6">Looks like you haven't made any purchases yet.</p>
          <a href="/" class="inline-block px-8 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest rounded-full">Start Shopping</a>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = transactions.map(trans => `
      <div class="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] overflow-hidden mb-6 group hover:border-[var(--brand-accent)] transition-all duration-300">
        <div class="p-6 border-b border-[var(--border-color)] flex flex-wrap justify-between items-center gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-[var(--bg-secondary)] rounded-xl flex items-center justify-center">
              <i class="ri-shopping-bag-3-line text-2xl"></i>
            </div>
            <div>
              <p class="text-[10px] text-[var(--text-muted)] uppercase font-black tracking-widest">Transaction ID</p>
              <p class="font-bold">#MIST-${trans.id}</p>
            </div>
          </div>
          <div class="flex items-center gap-8">
            <div>
              <p class="text-[10px] text-[var(--text-muted)] uppercase font-black tracking-widest">Date</p>
              <p class="text-sm font-medium">${new Date(trans.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div>
              <p class="text-[10px] text-[var(--text-muted)] uppercase font-black tracking-widest">Total Amount</p>
              <p class="text-sm font-black text-[var(--brand-accent)]">${formatRupiah(trans.total_amount)}</p>
            </div>
            <div>
              <span class="px-3 py-1 ${getStatusClass(trans.status)} text-[10px] font-black uppercase rounded-full">
                ${trans.status}
              </span>
            </div>
          </div>
        </div>
        <div class="p-6 bg-[var(--bg-secondary)]/30">
          <button onclick="window.toggleDetails(${trans.id})" class="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] flex items-center gap-2 hover:gap-3 transition-all">
            View Details <i class="ri-arrow-right-s-line"></i>
          </button>
          <div id="details-${trans.id}" class="hidden mt-6 pt-6 border-t border-[var(--border-color)]">
             <!-- Details injected here -->
          </div>
        </div>
      </div>
    `).join('');
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-orange-100 text-orange-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      case 'paid': return 'bg-blue-100 text-blue-600';
      case 'shipped': return 'bg-indigo-100 text-indigo-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  app.innerHTML = `
    ${renderNavbar()}
    <main class="min-h-screen pt-32 pb-20 bg-[var(--bg-secondary)]">
      <div class="container mx-auto px-4 max-w-4xl">
        <header class="mb-12">
          <h1 class="text-5xl font-heading font-black tracking-tighter mb-4">Transaction <span class="text-[var(--brand-accent)]">History</span></h1>
          <p class="text-[var(--text-secondary)] max-w-xl">Track your orders, view receipts, and manage your shopping history in one place.</p>
        </header>

        <div id="transaction-list" class="space-y-6">
          <!-- Loading placeholder -->
          <div class="animate-pulse space-y-6">
            <div class="h-32 bg-gray-200 rounded-2xl"></div>
            <div class="h-32 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  initNavbar();

  try {
    const res = await fetch('/api/transactions', {
      headers: { 'Authorization': `Bearer ${Storage.getToken()}` }
    });
    const data = await res.json();
    transactions = data.data;
    renderTransactions();
  } catch (err) {
    showToast('Failed to load transactions', 'error');
  }

  window.toggleDetails = async (id) => {
    const detailEl = document.getElementById(`details-${id}`);
    if (detailEl.classList.contains('hidden')) {
      // Fetch details if not already fetched
      if (!detailEl.dataset.fetched) {
        try {
          const res = await fetch(`/api/transactions/${id}`, {
            headers: { 'Authorization': `Bearer ${Storage.getToken()}` }
          });
          const data = await res.json();
          const trans = data.data;
          
          detailEl.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 class="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">Shipping Address</h4>
                <p class="text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-color)]">
                  ${trans.shipping_address}
                </p>
              </div>
              <div>
                <h4 class="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">Items Ordered</h4>
                <div class="space-y-4">
                  ${trans.items.map(item => `
                    <div class="flex items-center gap-4">
                      <img src="${item.image_url}" class="w-12 h-12 rounded object-cover">
                      <div class="flex-1">
                        <p class="text-sm font-bold">${item.name}</p>
                        <p class="text-[10px] text-[var(--text-muted)]">Qty: ${item.quantity} | Size: ${item.size}</p>
                      </div>
                      <p class="text-sm font-black">${formatRupiah(item.price * item.quantity)}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
            <div class="mt-8 flex justify-end">
               <button class="px-6 py-2 border border-[var(--border-color)] text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[var(--bg-primary)] transition-colors">Download Invoice</button>
            </div>
          `;
          detailEl.dataset.fetched = "true";
        } catch (err) {
          showToast('Failed to load details', 'error');
          return;
        }
      }
      detailEl.classList.remove('hidden');
    } else {
      detailEl.classList.add('hidden');
    }
  };
});