export const renderCheckoutForm = () => {
  return `
    <form id="checkoutForm" class="space-y-6 bg-[var(--bg-primary)] p-8 rounded-xl border border-[var(--border-color)]">
      <h3 class="font-heading text-2xl font-bold mb-6 border-b border-[var(--border-color)] pb-4">Shipping Details</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2">First Name</label>
          <input type="text" id="firstName" class="input-field" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Last Name</label>
          <input type="text" id="lastName" class="input-field" required>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Phone Number</label>
        <input type="tel" id="phone" class="input-field" required>
      </div>

      <div>
        <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Full Address</label>
        <textarea id="address" rows="3" class="input-field" required></textarea>
      </div>

      <h3 class="font-heading text-2xl font-bold mt-10 mb-6 border-b border-[var(--border-color)] pb-4">Payment Method</h3>
      
      <div class="space-y-4">
        <label class="flex items-center p-4 border border-[var(--border-color)] rounded-lg cursor-pointer hover:border-[var(--brand-accent)] transition-colors bg-[var(--bg-secondary)]">
          <input type="radio" name="paymentMethod" value="bank_transfer" class="w-4 h-4 text-[var(--brand-accent)]" checked>
          <span class="ml-3 font-medium">Bank Transfer (BCA, Mandiri, BNI)</span>
        </label>
        <label class="flex items-center p-4 border border-[var(--border-color)] rounded-lg cursor-pointer hover:border-[var(--brand-accent)] transition-colors bg-[var(--bg-secondary)]">
          <input type="radio" name="paymentMethod" value="ewallet" class="w-4 h-4 text-[var(--brand-accent)]">
          <span class="ml-3 font-medium">E-Wallet (GoPay, OVO, Dana)</span>
        </label>
      </div>

      <button type="submit" class="btn btn-primary w-full text-lg mt-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
        Place Order
      </button>
    </form>
  `;
};
