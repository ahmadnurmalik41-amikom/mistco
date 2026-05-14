import { banners } from '../data/banner.js';

export const renderHero = () => {
  const slide = banners[0]; // For hero, just use the first banner for now
  
  return `
    <section class="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-black/40 z-10"></div> <!-- Overlay -->
        <img src="${slide.image}" alt="${slide.title}" class="w-full h-full object-cover animate-pulse-slow">
      </div>
      
      <!-- Content -->
      <div class="container relative z-20 text-center text-white px-4">
        <h1 class="font-heading font-black text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tighter animate-slide-up" style="animation-delay: 0.1s; opacity: 0;">
          ${slide.title}
        </h1>
        <p class="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light text-gray-200 animate-slide-up" style="animation-delay: 0.3s; opacity: 0;">
          ${slide.subtitle}
        </p>
        <div class="animate-slide-up" style="animation-delay: 0.5s; opacity: 0;">
          <a href="${slide.ctaLink}" class="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-[var(--brand-accent)] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg group">
            ${slide.ctaText}
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-float">
        <a href="#categories" class="text-white opacity-70 hover:opacity-100 transition-opacity">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </a>
      </div>
    </section>
  `;
};
