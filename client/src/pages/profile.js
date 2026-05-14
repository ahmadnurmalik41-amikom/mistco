import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { Storage } from '../utils/storage.js';
import { logout } from '../services/auth-service.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  const user = Storage.getUser();
  
  if (!user) {
    window.location.href = '/pages/login.html';
    return;
  }

  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNavbar()}
    <main class="container mx-auto px-4 py-32 min-h-screen">
      <div class="max-w-4xl mx-auto bg-[var(--bg-primary)] p-8 rounded-xl border border-[var(--border-color)] shadow-sm">
        <h1 class="text-3xl font-heading font-bold mb-8 border-b border-[var(--border-color)] pb-4">My Profile</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="col-span-1 border-r border-[var(--border-color)] pr-8">
            <div class="w-32 h-32 bg-[var(--brand-accent-light)] text-[var(--brand-accent)] rounded-full flex items-center justify-center text-5xl font-bold mx-auto mb-4">
              ${user.name.charAt(0).toUpperCase()}
            </div>
            <h2 class="text-xl font-bold text-center mb-1">${user.name}</h2>
            <p class="text-[var(--text-secondary)] text-center text-sm mb-6">${user.email}</p>
            <button id="profileLogoutBtn" class="btn btn-outline w-full text-red-500 border-red-500 hover:bg-red-500 hover:text-white">Logout</button>
          </div>
          
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-xl font-bold mb-4">Account Details</h3>
            <div class="space-y-4 mb-8">
              <div>
                <label class="block text-sm text-[var(--text-secondary)]">Name</label>
                <div class="font-medium">${user.name}</div>
              </div>
              <div>
                <label class="block text-sm text-[var(--text-secondary)]">Email</label>
                <div class="font-medium">${user.email}</div>
              </div>
            </div>

            <h3 class="text-xl font-bold mb-4">Order History</h3>
            <div class="bg-[var(--bg-secondary)] rounded-lg p-8 text-center text-[var(--text-muted)] border border-[var(--border-color)]">
              No orders found yet. <a href="/" class="text-[var(--brand-accent)] hover:underline">Start shopping!</a>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  initNavbar();
  
  document.getElementById('profileLogoutBtn')?.addEventListener('click', logout);
});
