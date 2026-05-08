import React from 'react';
import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Privacy Policy</h1>
            <p className="mt-4 text-primary-foreground/70">Last updated: May 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-neutral max-w-none">
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Information We Collect</h2>
              <p>When you place an order via WhatsApp, we collect your name, phone number, delivery address, and order details. We do not require account creation or store passwords.</p>
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">How We Use Your Information</h2>
              <p>Your information is used solely to process and deliver your order. We may also use your contact details to send order updates and respond to inquiries.</p>
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Data Sharing</h2>
              <p>We do not sell, trade, or share your personal information with third parties, except as necessary to complete your delivery.</p>
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Data Security</h2>
              <p>We take reasonable measures to protect your personal information. However, no internet transmission is 100% secure.</p>
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Contact Us</h2>
              <p>If you have questions about this policy, please contact us at hello@bellaafrica.ca.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}