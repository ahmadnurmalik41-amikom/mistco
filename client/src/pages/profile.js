import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { Storage } from '../utils/storage.js';
import { logout } from '../services/auth-service.js';
import { showToast } from '../utils/toast.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', async () => {
  let user = Storage.getUser();
  
  if (!user) {
    window.location.href = '/pages/login.html';
    return;
  }

  const app = document.getElementById('app');
  
  const renderProfile = (userData) => {
    app.innerHTML = `
      ${renderNavbar()}
      <main class="min-h-screen pt-32 pb-20 bg-[var(--bg-secondary)]">
        <div class="container mx-auto px-4 max-w-5xl">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left Sidebar: Profile Card -->
            <div class="lg:col-span-1">
              <div class="bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-color)] p-8 sticky top-32">
                <div class="flex flex-col items-center text-center">
                  <div class="relative mb-6">
                    <div class="w-32 h-32 bg-[var(--brand-accent)] text-white rounded-full flex items-center justify-center text-5xl font-black shadow-xl shadow-indigo-100">
                      ${userData.name.charAt(0).toUpperCase()}
                    </div>
                    <button class="absolute bottom-1 right-1 w-10 h-10 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full flex items-center justify-center text-[var(--brand-accent)] hover:scale-110 transition-transform">
                      <i class="ri-camera-line"></i>
                    </button>
                  </div>
                  <h2 class="text-2xl font-heading font-black mb-1">${userData.name}</h2>
                  <p class="text-[var(--text-muted)] text-sm mb-8">${userData.email}</p>
                  
                  <div class="w-full space-y-2">
                    <a href="/pages/transaction.html" class="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-2xl hover:bg-[var(--bg-tertiary)] transition-colors group">
                      <span class="text-sm font-bold flex items-center gap-3">
                        <i class="ri-history-line text-lg text-[var(--brand-accent)]"></i>
                        Order History
                      </span>
                      <i class="ri-arrow-right-s-line text-[var(--text-muted)] group-hover:translate-x-1 transition-transform"></i>
                    </a>
                    <a href="/pages/wishlist.html" class="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-2xl hover:bg-[var(--bg-tertiary)] transition-colors group">
                      <span class="text-sm font-bold flex items-center gap-3">
                        <i class="ri-heart-line text-lg text-pink-500"></i>
                        Wishlist
                      </span>
                      <i class="ri-arrow-right-s-line text-[var(--text-muted)] group-hover:translate-x-1 transition-transform"></i>
                    </a>
                    ${userData.role === 'admin' ? `
                      <a href="/pages/admin-dashboard.html" class="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-colors group">
                        <span class="text-sm font-bold flex items-center gap-3 text-indigo-600">
                          <i class="ri-dashboard-line text-lg"></i>
                          Admin Panel
                        </span>
                        <i class="ri-arrow-right-s-line text-indigo-400 group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    ` : ''}
                  </div>

                  <button id="profileLogoutBtn" class="mt-8 text-xs font-black uppercase tracking-widest text-red-500 hover:opacity-70 transition-opacity">
                    <i class="ri-logout-box-line mr-2"></i> Log Out
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Content: Account Details -->
            <div class="lg:col-span-2 space-y-8">
              <div class="bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-color)] p-8 md:p-12">
                <div class="flex justify-between items-center mb-10">
                  <h3 class="text-2xl font-heading font-black">Account <span class="text-[var(--brand-accent)]">Details</span></h3>
                  <button id="editProfileBtn" class="px-6 py-2 border border-[var(--border-color)] text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[var(--bg-secondary)] transition-colors">
                    Edit Profile
                  </button>
                </div>

                <div id="profile-display" class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Full Name</label>
                    <p class="font-bold text-lg">${userData.name}</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Email Address</label>
                    <p class="font-bold text-lg">${userData.email}</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Phone Number</label>
                    <p class="font-bold text-lg">${userData.phone || '-'}</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Member Since</label>
                    <p class="font-bold text-lg">October 2023</p>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Shipping Address</label>
                    <p class="font-bold text-lg leading-relaxed">${userData.address || 'No address added yet.'}</p>
                  </div>
                </div>

                <!-- Edit Form (Hidden by default) -->
                <form id="profile-form" class="hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Full Name</label>
                    <input type="text" id="edit-name" value="${userData.name}" class="w-full px-6 py-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl outline-none focus:border-[var(--brand-accent)] transition-all font-bold">
                  </div>
                  <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Phone Number</label>
                    <input type="text" id="edit-phone" value="${userData.phone || ''}" class="w-full px-6 py-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl outline-none focus:border-[var(--brand-accent)] transition-all font-bold">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Shipping Address</label>
                    <textarea id="edit-address" class="w-full px-6 py-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl outline-none focus:border-[var(--brand-accent)] transition-all font-bold h-32">${userData.address || ''}</textarea>
                  </div>
                  <div class="md:col-span-2 flex justify-end gap-4 mt-4">
                    <button type="button" id="cancelEditBtn" class="px-8 py-3 text-xs font-black uppercase tracking-widest hover:opacity-70">Cancel</button>
                    <button type="submit" class="px-10 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all">Save Changes</button>
                  </div>
                </form>
              </div>

              <!-- Security Card -->
              <div class="bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-color)] p-8 md:p-12">
                 <h3 class="text-xl font-heading font-black mb-8">Security & Password</h3>
                 <div class="flex items-center justify-between p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                    <div class="flex items-center gap-4">
                       <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[var(--text-muted)]">
                          <i class="ri-lock-password-line text-lg"></i>
                       </div>
                       <div>
                          <p class="text-sm font-bold">Account Password</p>
                          <p class="text-[10px] text-[var(--text-muted)] uppercase font-black tracking-widest">Last changed 3 months ago</p>
                       </div>
                    </div>
                    <button class="text-xs font-black uppercase tracking-widest text-[var(--brand-accent)] hover:underline">Update</button>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      ${renderFooter()}
    `;

    initNavbar();
    attachListeners();
  };

  const attachListeners = () => {
    document.getElementById('profileLogoutBtn')?.addEventListener('click', logout);

    const editBtn = document.getElementById('editProfileBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const displayDiv = document.getElementById('profile-display');
    const form = document.getElementById('profile-form');

    editBtn?.addEventListener('click', () => {
      displayDiv.classList.add('hidden');
      form.classList.remove('hidden');
      editBtn.classList.add('hidden');
    });

    cancelBtn?.addEventListener('click', () => {
      displayDiv.classList.remove('hidden');
      form.classList.add('hidden');
      editBtn.classList.remove('hidden');
    });

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const updatedData = {
        name: document.getElementById('edit-name').value,
        phone: document.getElementById('edit-phone').value,
        address: document.getElementById('edit-address').value,
      };

      try {
        const res = await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Storage.getToken()}`
          },
          body: JSON.stringify(updatedData)
        });

        if (res.ok) {
          const result = await res.json();
          Storage.setUser(result.data);
          showToast('Profile updated successfully', 'success');
          renderProfile(result.data);
        } else {
          showToast('Update failed', 'error');
        }
      } catch (err) {
        showToast('Network error', 'error');
      }
    });
  };

  // Initial fetch to get full profile data
  try {
    const res = await fetch('/api/auth/profile', {
      headers: { 'Authorization': `Bearer ${Storage.getToken()}` }
    });
    const data = await res.json();
    user = data.data;
    Storage.setUser(user);
    renderProfile(user);
  } catch (err) {
    renderProfile(user); // Fallback to storage
  }
});
