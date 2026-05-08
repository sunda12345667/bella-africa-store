import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PromoBanner({ image, title, subtitle }) {
  return (
    <section className="py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center"
        >
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40" />
          <div className="relative z-10 p-8 md:p-16 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">{title || 'Fresh Arrivals Weekly'}</h2>
            <p className="mt-3 text-primary-foreground/70 text-lg">
              {subtitle || 'Discover new authentic African ingredients sourced directly from trusted suppliers.'}
            </p>
            <Button asChild size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
              <Link to="/shop">
                Explore Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}