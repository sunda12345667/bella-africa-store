const WHATSAPP_NUMBER = '14388365678';

export function generateWhatsAppLink({ items, subtotal, name, address, phone, notes }) {
  const itemLines = items.map(item => `  • ${item.name} x${item.quantity} — CAD $${(item.price * item.quantity).toFixed(2)}`).join('\n');

  const message = `Hello Bella Africa Store 🌍,

I'd like to place an order:

${itemLines}

*Order Total: CAD $${subtotal.toFixed(2)}*

👤 Customer Name: ${name || 'Not provided'}
📞 Phone Number: ${phone || 'Not provided'}
📍 Delivery Address: ${address || 'Not provided'}
📝 Notes: ${notes || 'None'}

Please confirm availability and delivery details. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppSupportLink(message = 'Hello Bella Africa Store, I need help with my order...') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}