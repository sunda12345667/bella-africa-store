import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppSupportLink } from '@/lib/whatsappService';

const FAQS = [
  { q: 'How do I place an order?', a: 'Simply browse our products, add items to your cart, and proceed to checkout. Your order will be sent directly to us via WhatsApp for quick confirmation.' },
  { q: 'Do I need to create an account?', a: 'No! We believe in a frictionless experience. Just add items to cart, fill in your delivery details, and place your order via WhatsApp. No account needed.' },
  { q: 'What areas do you deliver to?', a: 'We currently deliver across major Canadian cities including Toronto, Calgary, Vancouver, Ottawa, Montreal, Edmonton, and more. Contact us for specific delivery areas.' },
  { q: 'How long does delivery take?', a: 'Same-day delivery is available for orders placed before 2 PM in select areas. Standard delivery takes 1-3 business days depending on your location.' },
  { q: 'What payment methods do you accept?', a: 'We accept e-Transfer, cash on delivery, and major credit/debit cards. Payment details are confirmed via WhatsApp after order placement.' },
  { q: 'Can I return or exchange products?', a: 'We accept returns within 24 hours of delivery for non-perishable items in their original packaging. Perishable items must be reported within 2 hours of delivery.' },
  { q: 'Do you offer bulk or wholesale pricing?', a: 'Yes! We offer competitive pricing for bulk orders. Contact us via WhatsApp for a custom quote.' },
  { q: 'Are your products authentic?', a: 'Absolutely. We source directly from trusted suppliers and importers to ensure every product is 100% authentic African quality.' },
];

export default function FAQ() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">FAQ</h1>
            <p className="mt-4 text-primary-foreground/70 text-lg">Frequently asked questions</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5 data-[state=open]:bg-muted/30">
                <AccordionTrigger className="font-medium text-left hover:no-underline py-4">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-muted/50 rounded-2xl p-8">
            <h3 className="font-heading font-semibold text-xl">Still have questions?</h3>
            <p className="text-muted-foreground mt-2">Our team is here to help. Reach out anytime.</p>
            <a
              href={getWhatsAppSupportLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-colors mt-4"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}