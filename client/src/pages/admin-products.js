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

  let products = [];
  const app = document.getElementById('app');
  
  const renderProducts = () => {
    const tableBody = document.getElementById('products-table-body');
    tableBody.innerHTML = products.map(product => `
      <tr class="group hover:bg-[var(--bg-secondary)] transition-colors">
        <td class="py-4">
          <div class="flex items-center gap-4">
            <img src="${product.image_url}" class="w-12 h-12 rounded-lg object-cover bg-gray-100">
            <div>
              <p class="text-sm font-bold">${product.name}</p>
              <p class="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">${product.category}</p>
            </div>
          </div>
        </td>
        <td class="py-4 font-bold text-sm">${formatRupiah(product.price)}</td>
        <td class="py-4">
          <span class="px-2 py-1 ${product.stock > 10 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} text-[10px] font-black uppercase rounded">
            ${product.stock} in stock
          </span>
        </td>
        <td class="py-4">
          <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onclick="window.editProduct(${product.id})" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><i class="ri-edit-line"></i></button>
            <button onclick="window.deleteProduct(${product.id})" class="p-2 text-red-600 hover:bg-red-50 rounded-lg"><i class="ri-delete-bin-line"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  };

  app.innerHTML = `
    <div class="flex min-h-screen bg-[var(--bg-secondary)]">
      ${renderAdminSidebar('products')}
      
      <main class="flex-1 ml-64 p-10">
        <header class="flex justify-between items-center mb-10">
          <div>
            <h1 class="text-3xl font-heading font-bold text-[var(--text-primary)]">Manage Products</h1>
            <p class="text-[var(--text-muted)]">Add, edit, or remove products from your store</p>
          </div>
          <button id="add-product-btn" class="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <i class="ri-add-line text-lg"></i>
            Add New Product
          </button>
        </header>

        <div class="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
          <div class="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
            <div class="relative w-64">
              <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"></i>
              <input type="text" placeholder="Search products..." class="w-full pl-10 pr-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm outline-none focus:border-[var(--brand-accent)] transition-colors">
            </div>
            <div class="flex gap-2">
              <select class="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm outline-none">
                <option value="">All Categories</option>
                <option value="hoodie">Hoodie</option>
                <option value="kaos">Kaos</option>
                <option value="celana">Celana</option>
              </select>
            </div>
          </div>
          <div class="p-6">
            <table class="w-full">
              <thead>
                <tr class="text-left text-xs uppercase text-[var(--text-muted)] font-black tracking-widest border-b border-[var(--border-color)]">
                  <th class="pb-4">Product Info</th>
                  <th class="pb-4">Price</th>
                  <th class="pb-4">Inventory</th>
                  <th class="pb-4 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody id="products-table-body" class="divide-y divide-[var(--border-color)]">
                <!-- Products will be injected here -->
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal Placeholder (Simplified for demonstration) -->
    <div id="product-modal" class="fixed inset-0 bg-black/50 z-[100] hidden items-center justify-center backdrop-blur-sm">
      <div class="bg-[var(--bg-primary)] w-full max-w-lg rounded-2xl p-8 shadow-2xl scale-95 transition-all duration-300">
        <h2 id="modal-title" class="text-2xl font-heading font-bold mb-6">Add New Product</h2>
        <form id="product-form" class="space-y-4">
          <input type="hidden" id="p-id">
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Product Name</label>
            <input type="text" id="p-name" required class="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--brand-accent)] transition-all">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Price</label>
              <input type="number" id="p-price" required class="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--brand-accent)] transition-all">
            </div>
            <div>
              <label class="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Stock</label>
              <input type="number" id="p-stock" required class="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--brand-accent)] transition-all">
            </div>
          </div>
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Category</label>
            <select id="p-category" required class="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--brand-accent)] transition-all">
              <option value="hoodie">Hoodie</option>
              <option value="kaos">Kaos</option>
              <option value="celana">Celana</option>
              <option value="muslim">Muslim</option>
              <option value="workshirt">Workshirt</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Image URL</label>
            <input type="text" id="p-image" required class="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--brand-accent)] transition-all">
          </div>
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Description</label>
            <textarea id="p-description" class="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--brand-accent)] transition-all h-24"></textarea>
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" id="close-modal" class="px-6 py-3 text-xs font-bold uppercase tracking-widest">Cancel</button>
            <button type="submit" class="px-8 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest rounded-full">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  `;

  initAdminSidebar();

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products', {
        headers: { 'Authorization': `Bearer ${Storage.getToken()}` }
      });
      const data = await res.json();
      products = data.data;
      renderProducts();
    } catch (err) {
      showToast('Failed to load products', 'error');
    }
  };

  await fetchProducts();

  // Modal logic
  const modal = document.getElementById('product-modal');
  const addBtn = document.getElementById('add-product-btn');
  const closeBtn = document.getElementById('close-modal');
  const form = document.getElementById('product-form');

  addBtn.addEventListener('click', () => {
    form.reset();
    document.getElementById('p-id').value = '';
    document.getElementById('modal-title').textContent = 'Add New Product';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => modal.firstElementChild.classList.remove('scale-95'), 10);
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.firstElementChild.classList.add('scale-95');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('p-id').value;
    const data = {
      name: document.getElementById('p-name').value,
      price: document.getElementById('p-price').value,
      stock: document.getElementById('p-stock').value,
      category: document.getElementById('p-category').value,
      image_url: document.getElementById('p-image').value,
      description: document.getElementById('p-description').value,
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/products/${id}` : '/api/products';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Storage.getToken()}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showToast(id ? 'Product updated' : 'Product added', 'success');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        fetchProducts();
      } else {
        throw new Error();
      }
    } catch (err) {
      showToast('Action failed', 'error');
    }
  });

  window.editProduct = (id) => {
    const product = products.find(p => p.id === id);
    document.getElementById('p-id').value = product.id;
    document.getElementById('p-name').value = product.name;
    document.getElementById('p-price').value = product.price;
    document.getElementById('p-stock').value = product.stock;
    document.getElementById('p-category').value = product.category;
    document.getElementById('p-image').value = product.image_url;
    document.getElementById('p-description').value = product.description || '';
    
    document.getElementById('modal-title').textContent = 'Edit Product';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => modal.firstElementChild.classList.remove('scale-95'), 10);
  };

  window.deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${Storage.getToken()}` }
        });
        if (res.ok) {
          showToast('Product deleted', 'success');
          fetchProducts();
        }
      } catch (err) {
        showToast('Delete failed', 'error');
      }
    }
  };
});
