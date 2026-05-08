import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Grid3X3, MessageCircle } from 'lucide-react';
import { useCart } from '@/lib/cartStore.jsx';
import { motion } from 'framer-motion';

const TABS = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/shop', icon: Grid3X3, label: 'Shop' },
  { path: '/shop?search=true', icon: Search, label: 'Search' },
  { path: '__cart__', icon: ShoppingBag, label: 'Cart' },
  { path: '__whatsapp__', icon: MessageCircle, label: 'Chat' },
];

export default function MobileNav() {
  const location = useLocation();
  const { totalItems, setIsOpen } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-border/50">
      <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {TABS.map(tab => {
          const isActive = tab.path === location.pathname;
          const Icon = tab.icon;

          if (tab.path === '__cart__') {
            return (
              <button key={tab.path} onClick={() => setIsOpen(true)} className="flex flex-col items-center gap-0.5 px-3 py-1 relative">
                <Icon className="w-5 h-5 text-foreground/60" />
                <span className="text-[10px] text-foreground/60">{tab.label}</span>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 right-1 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            );
          }

          if (tab.path === '__whatsapp__') {
            return (
              <a
                key={tab.path}
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5 px-3 py-1"
              >
                <Icon className="w-5 h-5 text-green-600" />
                <span className="text-[10px] text-green-600">{tab.label}</span>
              </a>
            );
          }

          return (
            <Link key={tab.path} to={tab.path} className="flex flex-col items-center gap-0.5 px-3 py-1">
              <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-foreground/60'}`} />
              <span className={`text-[10px] ${isActive ? 'text-accent font-medium' : 'text-foreground/60'}`}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}