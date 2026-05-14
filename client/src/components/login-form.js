export const renderLoginForm = () => {
  return `
    <form id="loginForm" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2" for="email">Email Address</label>
        <input type="email" id="email" name="email" class="input-field" placeholder="you@example.com" required>
      </div>
      <div>
        <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2" for="password">Password</label>
        <input type="password" id="password" name="password" class="input-field" placeholder="••••••••" required>
      </div>
      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input type="checkbox" class="rounded border-[var(--border-color)] text-[var(--brand-accent)] focus:ring-[var(--brand-accent)] h-4 w-4">
          <span class="ml-2 text-sm text-[var(--text-secondary)]">Remember me</span>
        </label>
        <a href="#" class="text-sm font-medium text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)]">Forgot password?</a>
      </div>
      <button type="submit" class="btn btn-primary w-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
        Sign In
      </button>
    </form>
  `;
};
