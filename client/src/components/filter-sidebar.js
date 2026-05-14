export const renderFilterSidebar = () => {
  return `
    <aside class="w-full md:w-64 flex-shrink-0">
      <div class="bg-[var(--bg-secondary)] rounded-xl p-6 sticky top-24">
        <h3 class="font-heading font-bold text-lg mb-4">Filters</h3>
        
        <!-- Category Filter -->
        <div class="mb-6">
          <h4 class="font-medium mb-3 text-sm text-[var(--text-secondary)] uppercase tracking-wider">Category</h4>
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" value="hoodie" class="form-checkbox text-[var(--brand-accent)] rounded border-[var(--border-color)] bg-transparent focus:ring-0 w-5 h-5 transition-colors group-hover:border-[var(--brand-accent)]">
              <span class="group-hover:text-[var(--brand-accent)] transition-colors">Hoodies</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" value="kaos" class="form-checkbox text-[var(--brand-accent)] rounded border-[var(--border-color)] bg-transparent focus:ring-0 w-5 h-5 transition-colors group-hover:border-[var(--brand-accent)]">
              <span class="group-hover:text-[var(--brand-accent)] transition-colors">T-Shirts</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" value="celana" class="form-checkbox text-[var(--brand-accent)] rounded border-[var(--border-color)] bg-transparent focus:ring-0 w-5 h-5 transition-colors group-hover:border-[var(--brand-accent)]">
              <span class="group-hover:text-[var(--brand-accent)] transition-colors">Pants</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" value="muslim" class="form-checkbox text-[var(--brand-accent)] rounded border-[var(--border-color)] bg-transparent focus:ring-0 w-5 h-5 transition-colors group-hover:border-[var(--brand-accent)]">
              <span class="group-hover:text-[var(--brand-accent)] transition-colors">Muslim Wear</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" value="workshirt" class="form-checkbox text-[var(--brand-accent)] rounded border-[var(--border-color)] bg-transparent focus:ring-0 w-5 h-5 transition-colors group-hover:border-[var(--brand-accent)]">
              <span class="group-hover:text-[var(--brand-accent)] transition-colors">Workshirts</span>
            </label>
          </div>
        </div>

        <!-- Price Filter -->
        <div>
          <h4 class="font-medium mb-3 text-sm text-[var(--text-secondary)] uppercase tracking-wider">Price Range</h4>
          <div class="flex items-center gap-2">
            <input type="number" id="min-price" placeholder="Min" class="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg py-2 px-3 focus:outline-none focus:border-[var(--brand-accent)] text-sm">
            <span class="text-[var(--text-secondary)]">-</span>
            <input type="number" id="max-price" placeholder="Max" class="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg py-2 px-3 focus:outline-none focus:border-[var(--brand-accent)] text-sm">
          </div>
          <button id="apply-filters" class="w-full mt-4 bg-[var(--brand-accent)] text-black font-bold py-2 rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  `;
};

export const initFilterSidebar = (onFilterChange) => {
  const applyBtn = document.getElementById('apply-filters');
  if (applyBtn && onFilterChange) {
    applyBtn.addEventListener('click', () => {
      const checkedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
      const minPrice = document.getElementById('min-price').value;
      const maxPrice = document.getElementById('max-price').value;
      
      onFilterChange({
        categories: checkedCategories,
        minPrice: minPrice ? parseInt(minPrice) : null,
        maxPrice: maxPrice ? parseInt(maxPrice) : null
      });
    });
  }
};