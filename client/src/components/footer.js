import { Storage } from '../utils/storage.js';

export const renderFooter = () => {
  return `
    <footer class="bg-[var(--bg-secondary)] pt-16 pb-8 border-t border-[var(--border-color)] mt-auto">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div class="col-span-1 md:col-span-1">
            <a href="/" class="flex items-center gap-2 mb-6">
              <span class="font-heading font-black text-3xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-accent)] to-purple-400">MIST.CO</span>
            </a>
            <p class="text-[var(--text-secondary)] mb-6">Elevating urban fashion with premium quality and contemporary designs.</p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center hover:text-[var(--brand-accent)] transition-colors shadow-sm">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center hover:text-[var(--brand-accent)] transition-colors shadow-sm">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-heading font-semibold text-lg mb-6">Shop</h4>
            <ul class="space-y-4 text-[var(--text-secondary)]">
              <li><a href="/pages/hoodie.html" class="hover:text-[var(--brand-accent)] transition-colors">Hoodies</a></li>
              <li><a href="/pages/kaos.html" class="hover:text-[var(--brand-accent)] transition-colors">T-Shirts</a></li>
              <li><a href="/pages/celana.html" class="hover:text-[var(--brand-accent)] transition-colors">Pants</a></li>
              <li><a href="/pages/muslim.html" class="hover:text-[var(--brand-accent)] transition-colors">Muslim Wear</a></li>
              <li><a href="/pages/workshirt.html" class="hover:text-[var(--brand-accent)] transition-colors">Workshirts</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-heading font-semibold text-lg mb-6">Help</h4>
            <ul class="space-y-4 text-[var(--text-secondary)]">
              <li><a href="/pages/faq.html" class="hover:text-[var(--brand-accent)] transition-colors">FAQ</a></li>
              <li><a href="/pages/size-guide.html" class="hover:text-[var(--brand-accent)] transition-colors">Size Guide</a></li>
              <li><a href="#" class="hover:text-[var(--brand-accent)] transition-colors">Shipping</a></li>
              <li><a href="#" class="hover:text-[var(--brand-accent)] transition-colors">Returns</a></li>
              <li><a href="/pages/contact.html" class="hover:text-[var(--brand-accent)] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-heading font-semibold text-lg mb-6">Newsletter</h4>
            <p class="text-[var(--text-secondary)] mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form class="flex">
              <input type="email" placeholder="Enter your email" class="input-field rounded-r-none border-r-0" required>
              <button type="submit" class="btn btn-primary rounded-l-none">Subscribe</button>
            </form>
          </div>

        </div>

        <div class="border-t border-[var(--border-color)] pt-8 flex flex-col md:flex-row justify-between items-center text-[var(--text-muted)] text-sm">
          <p>&copy; 2026 MIST.CO. All rights reserved.</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="hover:text-[var(--text-primary)]">Privacy Policy</a>
            <a href="#" class="hover:text-[var(--text-primary)]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;
};
