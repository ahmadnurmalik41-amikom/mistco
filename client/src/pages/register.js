import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { register } from '../services/auth-service.js';
import { showToast } from '../utils/toast.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNavbar()}
    <main class="min-h-screen pt-20 flex flex-col lg:flex-row bg-[var(--bg-primary)]">
      <!-- Left Image Section -->
      <div class="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden group">
        <div class="absolute inset-0 bg-black/60 z-10 transition-colors duration-500 group-hover:bg-black/50"></div>
        <img src="https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
             class="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[10s] group-hover:scale-110" 
             alt="Sneaker Culture Fashion">
        <div class="relative z-20 text-center px-12 pb-20 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
          <h2 class="text-5xl lg:text-6xl font-black font-heading tracking-tighter mb-4 text-white leading-tight drop-shadow-lg">Join the<br>Movement</h2>
          <p class="text-lg text-gray-200 max-w-md mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 drop-shadow-md">Create an account to track orders, save your wishlist, and secure your spot for limited drops.</p>
        </div>
      </div>

      <!-- Right Form Section -->
      <div class="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 md:px-16 py-12 lg:py-20 relative overflow-hidden bg-[var(--bg-primary)]">
        <!-- Animated Background Orbs (Light-mode friendly) -->
        <div class="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-[var(--brand-accent)] rounded-full filter blur-[100px] opacity-[0.08] md:opacity-[0.15] animate-pulse pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-64 md:w-80 h-64 md:h-80 bg-purple-500 rounded-full filter blur-[100px] opacity-[0.08] md:opacity-[0.12] pointer-events-none"></div>

        <div class="w-full max-w-md relative z-10">
          <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2rem] p-8 sm:p-10 shadow-xl relative overflow-hidden transition-all hover:shadow-2xl">
            
            <div class="text-center mb-10">
              <h1 class="text-4xl font-heading font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-accent)] to-purple-500">Create Account</h1>
              <p class="text-[var(--text-secondary)]">Join MIST.CO for exclusive drops</p>
            </div>
            
            <form id="registerForm" class="space-y-6">
              <div id="error-msg" class="hidden bg-red-100 border border-red-300 text-red-600 p-3 rounded-xl text-sm text-center"></div>
              
              <div class="relative group">
                <label for="name" class="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Full Name</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-[var(--text-muted)] group-focus-within:text-[var(--brand-accent)] transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </span>
                  <input type="text" id="name" name="name" required 
                    class="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[var(--brand-accent)] focus:ring-4 focus:ring-[var(--brand-accent-light)] transition-all duration-300 shadow-sm"
                    placeholder="John Doe">
                </div>
              </div>

              <div class="relative group">
                <label for="email" class="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Email Address</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-[var(--text-muted)] group-focus-within:text-[var(--brand-accent)] transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                  </span>
                  <input type="email" id="email" name="email" required 
                    class="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[var(--brand-accent)] focus:ring-4 focus:ring-[var(--brand-accent-light)] transition-all duration-300 shadow-sm"
                    placeholder="name@example.com">
                </div>
              </div>
              
              <div class="relative group">
                <label for="password" class="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Password</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-[var(--text-muted)] group-focus-within:text-[var(--brand-accent)] transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </span>
                  <input type="password" id="password" name="password" required minlength="6"
                    class="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[var(--brand-accent)] focus:ring-4 focus:ring-[var(--brand-accent-light)] transition-all duration-300 shadow-sm"
                    placeholder="••••••••">
                </div>
                <p class="text-[10px] font-medium text-[var(--text-muted)] mt-2 ml-1">Must be at least 6 characters.</p>
              </div>
              
              <button type="submit" id="submitBtn" class="w-full relative group overflow-hidden bg-[var(--brand-accent)] text-white font-bold text-lg py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgba(109,40,217,0.4)] hover:-translate-y-0.5">
                <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-[var(--brand-accent)] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span class="relative z-10 transition-transform duration-300 inline-block group-hover:scale-105">Create Account</span>
              </button>
            </form>
            
            <p class="mt-8 text-center text-[var(--text-secondary)] text-sm font-medium">
              Already have an account? 
              <a id="loginLink" href="/pages/login.html" class="text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] hover:underline transition-colors font-bold">Sign in here</a>
            </p>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  initNavbar();

  // Pass redirect param to login link
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect');
  if (redirect) {
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
      loginLink.href = `/pages/login.html?redirect=${encodeURIComponent(redirect)}`;
    }
  }
  
  const form = document.getElementById('registerForm');
  const errorMsg = document.getElementById('error-msg');
  const submitBtn = document.getElementById('submitBtn');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      
      errorMsg.classList.add('hidden');
      submitBtn.textContent = 'Creating Account...';
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-70');
      
      try {
        await register({ name, email, password });
        // On success, redirect to the intended page or home
        const urlParams = new URLSearchParams(window.location.search);
        const redirectPath = urlParams.get('redirect') || '/';
        window.location.href = redirectPath;
      } catch (err) {
        const message = err.message || 'Registration failed. Please try again.';
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
        showToast(message, 'error');
        submitBtn.textContent = 'Create Account';
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-70');
      }
    });
  }
});