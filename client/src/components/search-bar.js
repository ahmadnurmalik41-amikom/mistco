export const renderSearchBar = () => {
  return `
    <div class="search-bar w-full max-w-lg mx-auto relative group">
      <form id="search-form" action="/pages/search.html" method="GET" class="relative flex items-center">
        <input 
          type="text" 
          name="q"
          id="search-input"
          placeholder="Search products, categories..." 
          class="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition-all"
          autocomplete="off"
        >
        <button type="submit" class="absolute right-4 text-[var(--text-secondary)] hover:text-[var(--brand-accent)] transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </form>
    </div>
  `;
};

export const initSearchBar = () => {
  const form = document.getElementById('search-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const input = document.getElementById('search-input').value.trim();
      if (!input) {
        e.preventDefault();
      }
    });
  }
};