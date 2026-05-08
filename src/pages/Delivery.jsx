import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Package, MessageCircle } from 'lucide-react';
import { getWhatsAppSupportLink } from '@/lib/whatsappService';

const ZONES = [
  { area: 'Anywhere in Canada', time: 'Varies by location', cost: 'Discussed via WhatsApp' },
];

export default function Delivery() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Delivery Information</h1>
            <p className="mt-4 text-primary-foreground/70 text-lg">We deliver anywhere across Canada 🇨🇦</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Quick Info */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Truck, label: 'Canada-Wide Delivery', desc: 'We deliver anywhere across Canada' },
              { icon: Package, label: 'Careful Packaging', desc: 'Temperature-controlled for perishables' },
              { icon: MessageCircle, label: 'Delivery Fee by WhatsApp', desc: 'Our team will confirm delivery cost with you directly' },
            ].map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border"
              >
                <Icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-heading font-semibold">{label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Delivery Zones */}
          <h2 className="text-2xl font-heading font-bold mb-6">Delivery Zones & Rates</h2>
          <div className="border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-4 font-medium text-sm">Area</th>
                  <th className="text-left p-4 font-medium text-sm">Delivery Time</th>
                  <th className="text-left p-4 font-medium text-sm">Cost</th>
                </tr>
              </thead>
              <tbody>
                {ZONES.map((zone, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4 text-sm font-medium">{zone.area}</td>
                    <td className="p-4 text-sm text-muted-foreground">{zone.time}</td>
                    <td className="p-4 text-sm font-medium">{zone.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-2xl text-center">
            <p className="text-muted-foreground">Questions about delivery to your area?</p>
            <a href={getWhatsAppSupportLink('Hi, I have a delivery question')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-600 font-medium mt-2 hover:underline">
              <MessageCircle className="w-4 h-4" /> Ask us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}