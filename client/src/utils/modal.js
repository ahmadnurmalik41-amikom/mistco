/**
 * MIST.CO Modal System
 * Beautiful custom confirmation modals.
 */

export const showConfirm = (message, title = 'Confirm Action', confirmText = 'Confirm', type = 'danger') => {
  return new Promise((resolve) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300';
    
    const confirmBtnClass = type === 'danger' 
      ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
      : 'bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] shadow-[var(--brand-accent)]/20';

    modal.innerHTML = `
      <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 md:p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full transform scale-95 opacity-0 transition-all duration-300 ease-out">
        <h3 class="text-2xl md:text-3xl font-black font-heading mb-3 text-[var(--text-primary)] leading-tight">${title}</h3>
        <p class="text-[var(--text-secondary)] mb-10 leading-relaxed">${message}</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button id="confirm-cancel" class="flex-1 py-4 px-6 rounded-2xl border border-[var(--border-color)] font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-all order-2 sm:order-1">Cancel</button>
          <button id="confirm-ok" class="flex-1 py-4 px-6 rounded-2xl ${confirmBtnClass} text-white font-bold transition-all shadow-lg order-1 sm:order-2">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Trigger animations
    requestAnimationFrame(() => {
      modal.querySelector('div').classList.remove('scale-95', 'opacity-0');
      modal.querySelector('div').classList.add('scale-100', 'opacity-100');
    });

    const cancelBtn = modal.querySelector('#confirm-cancel');
    const okBtn = modal.querySelector('#confirm-ok');

    const close = (result) => {
      modal.querySelector('div').classList.add('scale-95', 'opacity-0');
      modal.classList.add('opacity-0');
      setTimeout(() => {
        modal.remove();
        resolve(result);
      }, 300);
    };

    cancelBtn.addEventListener('click', () => close(false));
    okBtn.addEventListener('click', () => close(true));
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close(false);
    });

    // Close on Escape key
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        window.removeEventListener('keydown', handleEsc);
        close(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
  });
};
