import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppSupportLink } from '@/lib/whatsappService';

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium African ingredients"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-block text-amber-400 text-sm font-medium tracking-widest uppercase mb-4">
              Premium African Grocery
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
              The Taste of{' '}
              <span className="italic text-amber-400">Home,</span>
              <br />
              Delivered to You
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-md">
              Authentic African groceries sourced with care. From Nigerian foodstuffs to fresh produce — your heritage pantry awaits.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Button asChild size="lg" className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-medium rounded-full">
              <Link to="/shop">
                Shop Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 border-white/30 text-white hover:bg-white/10 rounded-full">
              <a href={getWhatsAppSupportLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Order via WhatsApp
              </a>
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6 mt-10 text-white/50 text-xs tracking-wide"
          >
            <span>✓ Same-Day Delivery</span>
            <span>✓ 100% Authentic</span>
            <span>✓ WhatsApp Support</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}