/**
 * MIST.CO Toast Notification System
 * A beautiful, non-blocking notification system.
 */

export const showToast = (message, type = 'success') => {
  // Ensure container exists
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 pointer-events-none';
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  
  // Styling based on type
  let bgColor, icon;
  switch (type) {
    case 'success':
      bgColor = 'bg-[#10b981]'; // Success green
      icon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
      break;
    case 'error':
      bgColor = 'bg-[#ef4444]'; // Error red
      icon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
      break;
    default:
      bgColor = 'bg-[var(--brand-accent)]';
      icon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  }

  toast.style.transform = 'translateX(120%)';
  toast.style.transition = 'all 0.5s cubic-bezier(0.23,1,0.32,1)';

  toast.className = `
    ${bgColor} text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] 
    flex items-center gap-4 pointer-events-auto
    border border-white/10 backdrop-blur-md min-w-[320px]
  `;

  toast.innerHTML = `
    <div class="flex-shrink-0 bg-white/20 p-2 rounded-xl">
      ${icon}
    </div>
    <div class="flex-1">
      <p class="text-sm font-bold tracking-wide">${message}</p>
    </div>
    <button class="ml-2 text-white/50 hover:text-white transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  `;

  // Add to container
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });

  // Close button listener
  const closeBtn = toast.querySelector('button');
  const removeToast = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%) scale(0.95)';
    setTimeout(() => toast.remove(), 500);
  };

  closeBtn.addEventListener('click', removeToast);

  // Auto remove
  const timeout = setTimeout(removeToast, 4000);
  
  // Pause auto-remove on hover
  toast.addEventListener('mouseenter', () => clearTimeout(timeout));
  toast.addEventListener('mouseleave', () => {
    setTimeout(removeToast, 2000);
  });
};
