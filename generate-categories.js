const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, 'client');
const srcPagesDir = path.join(clientDir, 'src', 'pages');

const categories = [
  { file: 'kaos', title: 'T-Shirts', categoryFilter: 'kaos' },
  { file: 'celana', title: 'Pants', categoryFilter: 'celana' },
  { file: 'workshirt', title: 'Workshirts', categoryFilter: 'workshirt' },
  { file: 'hoodie', title: 'Hoodies', categoryFilter: 'hoodie' },
  { file: 'muslim', title: 'Muslim Wear', categoryFilter: 'muslim' }
];

const template = (title, filter) => `import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderSortDropdown, initSortDropdown } from '../components/sort-dropdown.js';
import { renderProductGrid } from '../components/product-grid.js';
import { getProducts } from '../services/product-service.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('app');
  
  app.innerHTML = \`
    \${renderNavbar()}
    <main class="min-h-screen pt-24 pb-16 bg-[var(--bg-primary)]">
      <div class="container mx-auto px-4">
        
        <div class="mb-10 text-center">
          <h1 class="text-4xl font-heading font-bold mb-4">${title}</h1>
          <p class="text-[var(--text-secondary)]">Explore our premium collection of ${title.toLowerCase()}.</p>
        </div>

        <div class="flex-1 max-w-6xl mx-auto">
          <div class="flex justify-between items-center mb-6">
            <p class="text-[var(--text-secondary)]" id="result-count">Loading products...</p>
            \${renderSortDropdown()}
          </div>
          
          <div id="catalog-grid"></div>
        </div>

      </div>
    </main>
    \${renderFooter()}
  \`;

  initNavbar();
  
  let currentFiltered = [];
  
  const updateCatalog = (products) => {
    document.getElementById('result-count').textContent = \`Showing \${products.length} products\`;
    renderProductGrid(products, 'catalog-grid');
  };

  try {
    const allProducts = await getProducts();
    currentFiltered = allProducts.filter(p => p.category === '${filter}');
    
    updateCatalog(currentFiltered);
    
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
`;

categories.forEach(cat => {
  const filePath = path.join(srcPagesDir, `${cat.file}.js`);
  fs.writeFileSync(filePath, template(cat.title, cat.categoryFilter));
  console.log(`Updated: ${filePath}`);
});
