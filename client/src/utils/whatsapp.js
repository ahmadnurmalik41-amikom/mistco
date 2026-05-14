import { formatRupiah } from './currency.js';

export const generateWhatsAppLink = (transactionId, total, address) => {
  const phone = '628987584512'; // Replace with actual business number
  const message = `Halo MIST.CO,\nSaya ingin mengonfirmasi pembayaran untuk pesanan saya.\n\nID Transaksi: ${transactionId}\nTotal: ${formatRupiah(total)}\nAlamat: ${address}\n\nMohon segera diproses. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
