import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNavbar()}
    <main class="pt-20 flex-1 flex flex-col items-center justify-center text-center px-4 py-32">
      <h1 class="text-9xl font-heading font-black text-[var(--brand-accent)] mb-4">404</h1>
      <h2 class="text-3xl font-heading font-bold mb-6">Page Not Found</h2>
      <p class="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <a href="/" class="btn btn-primary">Back to Homepage</a>
    </main>
    ${renderFooter()}
  `;

  initNavbar();
});
