import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, MessageCircle } from 'lucide-react';
import { useCart } from '@/lib/cartStore.jsx';
import { Button } from '@/components/ui/button';
import { getWhatsAppSupportLink } from '@/lib/whatsappService';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/about', label: 'About' },
  { path: '/delivery', label: 'Delivery' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 -ml-2">
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-heading font-bold tracking-tight">
                Bella <span className="text-accent">Africa</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                    location.pathname === link.path ? 'text-accent' : 'text-foreground/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link to="/shop">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Search className="w-5 h-5" />
                </Button>
              </Link>
              <a href={getWhatsAppSupportLink()} target="_blank" rel="noopener noreferrer" className="hidden md:flex">
                <Button variant="ghost" size="icon" className="text-green-600">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </a>
              <button onClick={() => setIsOpen(true)} className="relative p-2">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-background z-[70] p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-heading font-bold">
                  Bella <span className="text-accent">Africa</span>
                </span>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-medium py-2 border-b border-border/30 ${
                      location.pathname === link.path ? 'text-accent' : 'text-foreground/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/faq" onClick={() => setMobileOpen(false)} className="text-lg font-medium py-2 text-foreground/70">FAQ</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}