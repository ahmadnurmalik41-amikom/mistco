import { renderAdminSidebar, initAdminSidebar } from '../components/admin-sidebar.js';
import { Storage } from '../utils/storage.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', async () => {
  // Security check
  if (!Storage.isAdmin()) {
    window.location.href = '/';
    return;
  }

  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="flex min-h-screen bg-[var(--bg-secondary)]">
      ${renderAdminSidebar('dashboard')}
      
      <main class="flex-1 ml-64 p-10">
        <header class="flex justify-between items-center mb-10">
          <div>
            <h1 class="text-3xl font-heading font-bold text-[var(--text-primary)]">Dashboard</h1>
            <p class="text-[var(--text-muted)]">Welcome back, ${Storage.getUser()?.name}</p>
          </div>
          <div class="flex items-center gap-4">
            <button class="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center relative">
              <i class="ri-notification-3-line text-lg"></i>
              <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--bg-primary)]"></span>
            </button>
            <div class="flex items-center gap-3 pl-4 border-l border-[var(--border-color)]">
              <img src="https://ui-avatars.com/api/?name=${Storage.getUser()?.name}&background=6366f1&color=fff" class="w-10 h-10 rounded-full border border-[var(--border-color)]">
              <div class="hidden md:block">
                <p class="text-sm font-bold leading-none">${Storage.getUser()?.name}</p>
                <p class="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <!-- Stats Card -->
          <div class="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-color)] group hover:border-[var(--brand-accent)] transition-all duration-300">
            <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <i class="ri-money-dollar-circle-line text-2xl"></i>
            </div>
            <p class="text-[var(--text-muted)] text-sm font-medium mb-1">Total Revenue</p>
            <h3 class="text-2xl font-bold">Rp 12,450,000</h3>
            <p class="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
              <i class="ri-arrow-up-line"></i> 12% from last month
            </p>
          </div>

          <div class="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-color)] group hover:border-[var(--brand-accent)] transition-all duration-300">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <i class="ri-shopping-cart-2-line text-2xl"></i>
            </div>
            <p class="text-[var(--text-muted)] text-sm font-medium mb-1">Total Orders</p>
            <h3 class="text-2xl font-bold">156</h3>
            <p class="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
              <i class="ri-arrow-up-line"></i> 8% from last month
            </p>
          </div>

          <div class="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-color)] group hover:border-[var(--brand-accent)] transition-all duration-300">
            <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
              <i class="ri-user-line text-2xl"></i>
            </div>
            <p class="text-[var(--text-muted)] text-sm font-medium mb-1">Total Customers</p>
            <h3 class="text-2xl font-bold">1,204</h3>
            <p class="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
              <i class="ri-arrow-up-line"></i> 5% from last month
            </p>
          </div>

          <div class="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-color)] group hover:border-[var(--brand-accent)] transition-all duration-300">
            <div class="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
              <i class="ri-stock-line text-2xl"></i>
            </div>
            <p class="text-[var(--text-muted)] text-sm font-medium mb-1">Active Products</p>
            <h3 class="text-2xl font-bold">48</h3>
            <p class="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
              <i class="ri-arrow-down-line"></i> 2% from last month
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 bg-[var(--bg-primary)] p-8 rounded-2xl border border-[var(--border-color)]">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-xl font-heading font-bold">Recent Transactions</h3>
              <a href="/pages/admin-orders.html" class="text-sm font-bold text-[var(--brand-accent)] hover:underline">View All</a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-left text-xs uppercase text-[var(--text-muted)] font-black tracking-widest border-b border-[var(--border-color)]">
                    <th class="pb-4">Transaction ID</th>
                    <th class="pb-4">Customer</th>
                    <th class="pb-4">Amount</th>
                    <th class="pb-4">Status</th>
                    <th class="pb-4">Date</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--border-color)]">
                  <tr>
                    <td class="py-4 font-bold text-sm">#MIST-9421</td>
                    <td class="py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-bold">AN</div>
                        <span class="text-sm">Ahmad Malik</span>
                      </div>
                    </td>
                    <td class="py-4 font-bold text-sm">Rp 450,000</td>
                    <td class="py-4">
                      <span class="px-2 py-1 bg-green-100 text-green-600 text-[10px] font-black uppercase rounded">Completed</span>
                    </td>
                    <td class="py-4 text-xs text-[var(--text-muted)]">Oct 12, 2023</td>
                  </tr>
                  <tr>
                    <td class="py-4 font-bold text-sm">#MIST-9420</td>
                    <td class="py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-bold">JD</div>
                        <span class="text-sm">John Doe</span>
                      </div>
                    </td>
                    <td class="py-4 font-bold text-sm">Rp 299,000</td>
                    <td class="py-4">
                      <span class="px-2 py-1 bg-orange-100 text-orange-600 text-[10px] font-black uppercase rounded">Pending</span>
                    </td>
                    <td class="py-4 text-xs text-[var(--text-muted)]">Oct 12, 2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-[var(--bg-primary)] p-8 rounded-2xl border border-[var(--border-color)]">
             <h3 class="text-xl font-heading font-bold mb-8">Popular Products</h3>
             <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100" class="w-12 h-12 rounded-lg object-cover">
                  <div class="flex-1">
                    <p class="text-sm font-bold leading-tight">Vintage Oversized Hoodie</p>
                    <p class="text-xs text-[var(--text-muted)]">124 sales</p>
                  </div>
                  <p class="text-sm font-black text-[var(--brand-accent)]">Rp 350k</p>
                </div>
                <div class="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=100" class="w-12 h-12 rounded-lg object-cover">
                  <div class="flex-1">
                    <p class="text-sm font-bold leading-tight">Slim Fit Denim Pants</p>
                    <p class="text-xs text-[var(--text-muted)]">89 sales</p>
                  </div>
                  <p class="text-sm font-black text-[var(--brand-accent)]">Rp 450k</p>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  `;

  initAdminSidebar();
});
