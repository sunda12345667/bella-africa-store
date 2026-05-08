const WHATSAPP_NUMBER = '15551234567'; // Replace with actual number

export function generateWhatsAppLink({ items, subtotal, name, address, phone, notes }) {
  const itemLines = items.map(item => `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`).join('\n');

  const message = `Hello Bella Africa 🌿,

I want to place an order:

${itemLines}

*Total: $${subtotal.toFixed(2)}*

📍 Delivery Address: ${address || 'Not provided'}
📞 Phone Number: ${phone || 'Not provided'}
👤 Name: ${name || 'Not provided'}
📝 Additional Notes: ${notes || 'None'}

Please confirm availability. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppSupportLink(message = 'Hello Bella Africa, I need help with...') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}