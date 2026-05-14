import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNavbar()}
    <main class="min-h-screen pt-24 pb-16">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8 capitalize">transaction Page</h1>
        <p class="text-gray-600">This page is under construction.</p>
      </div>
    </main>
    ${renderFooter()}
  `;

  initNavbar();
});