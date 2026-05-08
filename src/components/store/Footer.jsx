import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import { getWhatsAppSupportLink } from '@/lib/whatsappService';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">
              Bella <span className="text-accent">Africa</span>
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Your premium African grocery destination in Canada. Bringing the authentic taste of home to your doorstep.
            </p>
            <a
              href={getWhatsAppSupportLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/shop', label: 'Shop All' },
                { to: '/about', label: 'About Us' },
                { to: '/delivery', label: 'Delivery Info' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Categories</h4>
            <div className="flex flex-col gap-2">
              {['African Foodstuff', 'Nigerian Groceries', 'Frozen Foods', 'Spices', 'Fresh Produce', 'Drinks'].map(cat => (
                <Link key={cat} to="/shop" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Toronto, Ontario, Canada</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>hello@bellaafrica.ca</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">© 2026 Bella Africa Store. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-xs text-primary-foreground/40 hover:text-accent">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}