import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNavbar()}
    <main class="pt-20">
      <div class="bg-[var(--bg-secondary)] py-16 border-b border-[var(--border-color)]">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4">About Us</h1>
          <p class="text-[var(--text-secondary)] max-w-2xl mx-auto">Elevating urban fashion since 2026.</p>
        </div>
      </div>
      
      <div class="container mx-auto px-4 py-16 max-w-4xl">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-xl mb-6 leading-relaxed">MIST.CO is an urban fashion brand dedicated to creating high-quality, contemporary clothing that empowers individuals to express their unique style.</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-4 font-heading">Our Mission</h2>
          <p class="mb-6 leading-relaxed">We believe that clothing should be a seamless extension of your personality. Our mission is to provide premium apparel that combines durability, comfort, and cutting-edge design at accessible prices.</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-4 font-heading">Quality First</h2>
          <p class="mb-6 leading-relaxed">Every piece in our collection is carefully crafted using selected materials. From the weight of our hoodies to the stitching on our cargo pants, we pay attention to every detail so you can wear our products with confidence.</p>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  initNavbar();
});
