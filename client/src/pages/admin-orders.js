import { renderAdminSidebar, initAdminSidebar } from '../components/admin-sidebar.js';
import { Storage } from '../utils/storage.js';
import { formatRupiah } from '../utils/currency.js';
import { showToast } from '../utils/toast.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', async () => {
  if (!Storage.isAdmin()) {
    window.location.href = '/';
    return;
  }

  let orders = [];
  const app = document.getElementById('app');
  
  const renderOrders = () => {
    const tableBody = document.getElementById('orders-table-body');
    tableBody.innerHTML = orders.map(order => `
      <tr class="group hover:bg-[var(--bg-secondary)] transition-colors">
        <td class="py-4">
          <p class="text-sm font-bold">#MIST-${order.id}</p>
          <p class="text-[10px] text-[var(--text-muted)]">${new Date(order.created_at).toLocaleDateString()}</p>
        </td>
        <td class="py-4">
          <p class="text-sm font-medium">${order.user_name}</p>
          <p class="text-[10px] text-[var(--text-muted)]">${order.user_email}</p>
        </td>
        <td class="py-4 font-bold text-sm">${formatRupiah(order.total_amount)}</td>
        <td class="py-4">
          <select onchange="window.updateStatus(${order.id}, this.value)" class="px-3 py-1 text-[10px] font-black uppercase rounded outline-none border border-transparent focus:border-[var(--brand-accent)] ${getStatusClass(order.status)}">
            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="paid" ${order.status === 'paid' ? 'selected' : ''}>Paid</option>
            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td class="py-4 text-right">
           <button onclick="window.viewOrder(${order.id})" class="p-2 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg"><i class="ri-eye-line"></i></button>
        </td>
      </tr>
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
    <div class="flex min-h-screen bg-[var(--bg-secondary)]">
      ${renderAdminSidebar('orders')}
      
      <main class="flex-1 ml-64 p-10">
        <header class="flex justify-between items-center mb-10">
          <div>
            <h1 class="text-3xl font-heading font-bold text-[var(--text-primary)]">Customer Orders</h1>
            <p class="text-[var(--text-muted)]">Manage and track all transactions</p>
          </div>
        </header>

        <div class="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
          <div class="p-6">
            <table class="w-full">
              <thead>
                <tr class="text-left text-xs uppercase text-[var(--text-muted)] font-black tracking-widest border-b border-[var(--border-color)]">
                  <th class="pb-4">Order ID</th>
                  <th class="pb-4">Customer</th>
                  <th class="pb-4">Total</th>
                  <th class="pb-4">Status</th>
                  <th class="pb-4 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody id="orders-table-body" class="divide-y divide-[var(--border-color)]">
                <!-- Orders will be injected here -->
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `;

  initAdminSidebar();

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/transactions/admin/all', {
        headers: { 'Authorization': `Bearer ${Storage.getToken()}` }
      });
      const data = await res.json();
      orders = data.data;
      renderOrders();
    } catch (err) {
      showToast('Failed to load orders', 'error');
    }
  };

  await fetchOrders();

  window.updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/transactions/admin/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Storage.getToken()}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showToast('Status updated', 'success');
        fetchOrders();
      }
    } catch (err) {
      showToast('Update failed', 'error');
    }
  };

  window.viewOrder = (id) => {
    // Navigate to transaction detail or show modal
    window.location.href = `/pages/transaction.html?id=${id}`;
  };
});
