import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderSearchBar, initSearchBar } from '../components/search-bar.js';
import { renderFilterSidebar, initFilterSidebar } from '../components/filter-sidebar.js';
import { renderSortDropdown, initSortDropdown } from '../components/sort-dropdown.js';
import { renderProductGrid } from '../components/product-grid.js';
import { getProducts } from '../services/product-service.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNavbar()}
    <main class="min-h-screen pt-24 pb-16 bg-[var(--bg-primary)]">
      <div class="container mx-auto px-4">
        
        <div class="mb-10 text-center">
          <h1 class="text-4xl font-heading font-bold mb-4">Shop All Products</h1>
          ${renderSearchBar()}
        </div>

        <div class="flex flex-col md:flex-row gap-8">
          ${renderFilterSidebar()}
          
          <div class="flex-1">
            <div class="flex justify-between items-center mb-6">
              <p class="text-[var(--text-secondary)]" id="result-count">Loading products...</p>
              ${renderSortDropdown()}
            </div>
            
            <div id="catalog-grid"></div>
          </div>
        </div>

      </div>
    </main>
    ${renderFooter()}
  `;

  initNavbar();
  initSearchBar();
  
  let allProducts = [];
  let currentFiltered = [];
  
  const updateCatalog = async (products) => {
    document.getElementById('result-count').textContent = `Showing ${products.length} products`;
    await renderProductGrid(products, 'catalog-grid');
  };

  try {
    allProducts = await getProducts();
    currentFiltered = [...allProducts];
    updateCatalog(currentFiltered);
    
    initFilterSidebar((filters) => {
      let filtered = [...allProducts];
      
      if (filters.categories && filters.categories.length > 0) {
        filtered = filtered.filter(p => filters.categories.includes(p.category));
      }
      if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= filters.minPrice);
      }
      if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice);
      }
      
      currentFiltered = filtered;
      // Trigger sort again on new filtered data
      const sortSelect = document.getElementById('sort-select');
      if (sortSelect) sortSelect.dispatchEvent(new Event('change'));
      else updateCatalog(currentFiltered);
    });
    
    initSortDropdown((sortVal) => {
      let sorted = [...currentFiltered];
      if (sortVal === 'price-low') sorted.sort((a,b) => a.price - b.price);
      else if (sortVal === 'price-high') sorted.sort((a,b) => b.price - a.price);
      else if (sortVal === 'name-asc') sorted.sort((a,b) => a.name.localeCompare(b.name));
      else sorted.sort((a,b) => b.id - a.id);
      
      updateCatalog(sorted);
    });

  } catch (err) {
    console.error(err);
    document.getElementById('catalog-grid').innerHTML = '<p class="text-red-500">Failed to load products.</p>';
  }
});