import { renderNavbar, initNavbar } from './components/navbar.js';
import { renderHero } from './components/hero.js';
import { renderCategorySection } from './components/category-section.js';
import { renderFooter } from './components/footer.js';
import { renderProductGrid } from './components/product-grid.js';
import { initScrollReveal } from './utils/animation.js';
import { getProducts } from './services/product-service.js';

import './style.css'; 

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNavbar()}
    <main>
      ${renderHero()}
      
      <section class="section bg-[var(--bg-secondary)]">
        <div class="container">
          <div class="flex justify-between items-end mb-10 reveal">
            <div>
              <h2 class="text-4xl font-heading font-bold mb-2">New Arrivals</h2>
              <p class="text-[var(--text-secondary)]">The latest drops from our collection.</p>
            </div>
            <a href="/pages/search.html" class="hidden sm:inline-flex text-[var(--brand-accent)] font-medium hover:underline">View All</a>
          </div>
          <div id="new-arrivals-grid"></div>
        </div>
      </section>

      ${renderCategorySection()}
    </main>
    ${renderFooter()}
  `;

  initNavbar();
  
  try {
    const products = await getProducts(); 
    const newArrivals = products.filter(p => p.isNew).slice(0, 4);
    renderProductGrid(newArrivals, 'new-arrivals-grid');
    initScrollReveal();
  } catch (error) {
    console.error("Failed to load products for home page", error);
  }
});
