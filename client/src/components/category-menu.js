export const renderCategoryMenu = () => {
  return `
    <nav class="category-menu hidden md:flex items-center space-x-8">
      <a href="/pages/hoodie.html" class="text-[var(--text-secondary)] hover:text-[var(--brand-accent)] font-medium transition-colors">Hoodies</a>
      <a href="/pages/kaos.html" class="text-[var(--text-secondary)] hover:text-[var(--brand-accent)] font-medium transition-colors">T-Shirts</a>
      <a href="/pages/celana.html" class="text-[var(--text-secondary)] hover:text-[var(--brand-accent)] font-medium transition-colors">Pants</a>
      <a href="/pages/muslim.html" class="text-[var(--text-secondary)] hover:text-[var(--brand-accent)] font-medium transition-colors">Muslim Wear</a>
      <a href="/pages/workshirt.html" class="text-[var(--text-secondary)] hover:text-[var(--brand-accent)] font-medium transition-colors">Workshirts</a>
    </nav>
  `;
};

export const initCategoryMenu = () => {
  // Initialization logic if needed
};