import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, Shield, MapPin } from 'lucide-react';

const FEATURES = [
  { icon: Truck, title: 'Fast Delivery', desc: 'Same-day and next-day delivery available across major Canadian cities.' },
  { icon: Clock, title: 'Easy Ordering', desc: 'Order via our website or WhatsApp. We make it simple and quick.' },
  { icon: Shield, title: 'Quality Guaranteed', desc: 'Authentic, fresh products sourced directly from trusted suppliers.' },
  { icon: MapPin, title: 'Canada-Wide', desc: 'Serving Toronto, Calgary, Vancouver, Ottawa, and more cities.' },
];

export default function DeliverySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">Delivery You Can Trust</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-colors"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}