export const renderSortDropdown = () => {
  return `
    <div class="sort-dropdown relative">
      <select id="sort-select" class="appearance-none bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-[var(--brand-accent)] cursor-pointer">
        <option value="newest">Newest Arrivals</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--text-secondary)]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  `;
};

export const initSortDropdown = (onSortChange) => {
  const select = document.getElementById('sort-select');
  if (select && onSortChange) {
    select.addEventListener('change', (e) => {
      onSortChange(e.target.value);
    });
  }
};