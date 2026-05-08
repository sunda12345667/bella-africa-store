import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast({ title: 'Subscribed!', description: 'Thank you for joining our community.' });
      setEmail('');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto"
        >
          <span className="text-accent text-sm font-medium tracking-widest uppercase">Stay Connected</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">Join Our Community</h2>
          <p className="mt-4 text-muted-foreground">
            Get updates on new arrivals, special offers, and authentic recipes delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 mt-8 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full px-5"
            />
            <Button type="submit" className="h-12 px-6 rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}