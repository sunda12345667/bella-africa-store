import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Chioma O.',
    location: 'Toronto, ON',
    text: 'Bella Africa brings the taste of home right to my door. The quality of the foodstuffs is exceptional — just like buying from the market back home!',
    rating: 5,
  },
  {
    name: 'Adebayo M.',
    location: 'Calgary, AB',
    text: 'WhatsApp ordering is so convenient! I placed my order and it arrived the same day. The Palm oil and Egusi are top quality.',
    rating: 5,
  },
  {
    name: 'Fatima K.',
    location: 'Vancouver, BC',
    text: 'Finally, an African grocery store that understands what we need. Fresh produce, authentic spices, and amazing customer service.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-primary-foreground/80 leading-relaxed text-sm">{t.text}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-heading font-bold text-accent">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-primary-foreground/50">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}