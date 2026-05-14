import { categories } from '../data/categories.js';

export const renderCategorySection = () => {
  const categoryHTML = categories.map((cat, index) => `
    <a href="${cat.link}" class="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-lg reveal transition-transform duration-500 hover:-translate-y-2" style="transition-delay: ${index * 100}ms;">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
      <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
      <div class="absolute bottom-0 left-0 p-6 z-20 w-full">
        <h3 class="text-white font-heading font-bold text-2xl md:text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${cat.name}</h3>
        <div class="flex items-center text-[var(--brand-accent)] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          Shop Now <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>
      </div>
    </a>
  `).join('');

  return `
    <section id="categories" class="section bg-[var(--bg-primary)]">
      <div class="container">
        <div class="text-center mb-16 reveal">
          <h2 class="text-4xl md:text-5xl font-heading font-bold mb-4">Shop by Category</h2>
          <div class="w-24 h-1 bg-[var(--brand-accent)] mx-auto rounded"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          ${categoryHTML}
        </div>
      </div>
    </section>
  `;
};
