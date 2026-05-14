export const renderRegisterForm = () => {
  return `
    <form id="registerForm" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2" for="name">Full Name</label>
        <input type="text" id="name" name="name" class="input-field" placeholder="John Doe" required>
      </div>
      <div>
        <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2" for="email">Email Address</label>
        <input type="email" id="email" name="email" class="input-field" placeholder="you@example.com" required>
      </div>
      <div>
        <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2" for="password">Password</label>
        <input type="password" id="password" name="password" class="input-field" placeholder="••••••••" required minlength="6">
      </div>
      <div>
        <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2" for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" class="input-field" placeholder="••••••••" required minlength="6">
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="terms" required class="rounded border-[var(--border-color)] text-[var(--brand-accent)] focus:ring-[var(--brand-accent)] h-4 w-4">
        <label for="terms" class="ml-2 text-sm text-[var(--text-secondary)]">I agree to the <a href="#" class="text-[var(--brand-accent)]">Terms and Conditions</a></label>
      </div>
      <button type="submit" class="btn btn-primary w-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
        Create Account
      </button>
    </form>
  `;
};
