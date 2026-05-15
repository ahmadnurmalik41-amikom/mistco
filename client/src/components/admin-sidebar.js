export const renderAdminSidebar = (activePage) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line', href: '/pages/admin-dashboard.html' },
    { id: 'products', label: 'Products', icon: 'ri-shopping-bag-line', href: '/pages/admin-products.html' },
    { id: 'orders', label: 'Orders', icon: 'ri-list-ordered', href: '/pages/admin-orders.html' },
    { id: 'home', label: 'Back to Site', icon: 'ri-home-4-line', href: '/' },
  ];

  return `
    <aside class="fixed left-0 top-0 h-full w-64 bg-[var(--bg-primary)] border-r border-[var(--border-color)] z-50 transition-all duration-300">
      <div class="p-6">
        <a href="/" class="flex items-center gap-2 mb-10">
          <span class="text-2xl font-heading font-black tracking-tighter">MIST<span class="text-[var(--brand-accent)]">.CO</span></span>
          <span class="px-2 py-0.5 bg-[var(--brand-accent)] text-white text-[10px] font-bold rounded uppercase">Admin</span>
        </a>

        <nav class="space-y-1">
          ${menuItems.map(item => `
            <a href="${item.href}" 
               class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activePage === item.id ? 'bg-[var(--brand-accent)] text-white font-medium' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'}">
              <i class="${item.icon} text-lg"></i>
              <span>${item.label}</span>
            </a>
          `).join('')}
        </nav>
      </div>

      <div class="absolute bottom-0 left-0 w-full p-6 border-t border-[var(--border-color)]">
        <button id="admin-logout" class="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
          <i class="ri-logout-box-line text-lg"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  `;
};

export const initAdminSidebar = () => {
  const logoutBtn = document.getElementById('admin-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/pages/login.html';
    });
  }
};
