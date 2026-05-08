import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { getWhatsAppSupportLink } from '@/lib/whatsappService';
import { CATEGORIES } from '@/lib/categories';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-3">
              BELLA <span className="text-accent">AFRICA</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Your premium African grocery destination in Canada. Bringing the authentic taste of home to your doorstep.
            </p>
            <a
              href={getWhatsAppSupportLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-accent/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-accent/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-accent/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-4 uppercase tracking-wider text-accent">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/shop', label: 'Shop All' },
                { to: '/about', label: 'About Us' },
                { to: '/delivery', label: 'Delivery Info' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contact', label: 'Contact' },
                { to: '/privacy', label: 'Privacy Policy' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-sm text-white/60 hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-base mb-4 uppercase tracking-wider text-accent">Categories</h4>
            <div className="flex flex-col gap-2">
              {CATEGORIES.slice(0, 6).map(cat => (
                <Link key={cat.slug} to={`/shop?category=${cat.slug}`} className="text-sm text-white/60 hover:text-accent transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base mb-4 uppercase tracking-wider text-accent">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span>Toronto, Ontario, Canada</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-accent" />
                <span>hello@bellaafrica.ca</span>
              </div>
            </div>
            <div className="mt-6 bg-white/10 rounded p-4 text-sm">
              <p className="font-semibold text-accent mb-1">Business Hours</p>
              <p className="text-white/60 text-xs">Mon–Fri: 9am – 8pm</p>
              <p className="text-white/60 text-xs">Sat–Sun: 10am – 6pm</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">© 2026 Bella Africa Store. All rights reserved.</p>
          <p className="text-xs text-white/40">Proudly serving the African diaspora in Canada 🇨🇦</p>
          <Link to="/admin" className="text-xs text-white/20 hover:text-white/50 transition-colors ml-auto md:ml-0">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}