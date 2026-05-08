import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Phone, ChevronDown, MessageCircle } from 'lucide-react';
import { useCart } from '@/lib/cartStore.jsx';
import { CATEGORIES } from '@/lib/categories';
import { getWhatsAppSupportLink } from '@/lib/whatsappService';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop All' },
  { path: '/delivery', label: 'Delivery' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-white text-center text-xs py-2 px-4">
        <span className="font-semibold">🇨🇦 Canada-Wide Delivery</span>
        <span className="mx-3 opacity-40">|</span>
        <span>Same-day delivery in Beaumont & Edmonton Area</span>
        <span className="mx-3 opacity-40">|</span>
        <a href="https://wa.me/14388365678" target="_blank" rel="noopener noreferrer" className="font-bold text-accent hover:underline">
          Order on WhatsApp
        </a>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 h-16 md:h-20">
            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-1 shrink-0">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Logo */}
            <Link to="/" className="shrink-0">
              <div className="leading-none">
                <div className="text-lg md:text-2xl font-black tracking-tight">
                  <span className="text-primary">BELLA</span>
                  <span className="text-accent"> AFRICA</span>
                </div>
                <div className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-widest uppercase">Premium African Store</div>
              </div>
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 hidden md:flex">
              <div className="flex w-full max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search African groceries, spices, drinks..."
                  className="flex-1 h-11 px-5 border-2 border-primary/30 rounded-l-lg focus:outline-none focus:border-primary text-sm"
                />
                <button type="submit" className="h-11 px-6 bg-primary text-white rounded-r-lg hover:bg-primary/90 transition-colors font-semibold text-sm">
                  Search
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
              <Link to="/shop" className="md:hidden p-2">
                <Search className="w-5 h-5 text-gray-600" />
              </Link>
              <a
                href={getWhatsAppSupportLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <button onClick={() => setIsOpen(true)} className="relative p-2 flex items-center gap-1.5 bg-primary text-white rounded-lg px-3 py-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm font-semibold hidden md:block">Cart</span>
                {totalItems > 0 && (
                  <span className="w-5 h-5 bg-accent text-accent-foreground text-[10px] font-black rounded-full flex items-center justify-center leading-none">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Category nav bar */}
        <div className="bg-primary hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center">
              <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
                <button className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 font-bold text-sm">
                  <Menu className="w-4 h-4" />
                  All Categories
                  <ChevronDown className="w-4 h-4" />
                </button>
                {catOpen && (
                  <div className="absolute top-full left-0 bg-white shadow-2xl border z-50 w-72 py-2 rounded-b-xl">
                    {CATEGORIES.map(cat => (
                      <Link
                        key={cat.slug}
                        to={`/shop?category=${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/5 text-sm text-gray-700 hover:text-primary transition-colors"
                        onClick={() => setCatOpen(false)}
                      >
                        <span className="text-lg w-7">{cat.icon}</span>
                        <div>
                          <div className="font-medium">{cat.name}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <nav className="flex items-center overflow-x-auto">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      location.pathname === link.path ? 'text-accent bg-white/10' : 'text-white hover:text-accent'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setMobileOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-white z-[70] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b bg-primary text-white">
              <span className="text-lg font-black">BELLA <span className="text-accent">AFRICA</span></span>
              <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            {/* Mobile search */}
            <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className="p-3 border-b">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 h-9 px-3 border border-gray-200 rounded-l text-sm focus:outline-none focus:border-primary"
                />
                <button type="submit" className="h-9 px-3 bg-primary text-white rounded-r text-sm">Go</button>
              </div>
            </form>
            <div className="p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Shop by Category</p>
              <div className="space-y-0.5">
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.slug}
                    to={`/shop?category=${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <span className="text-base">{cat.icon}</span> {cat.name}
                  </Link>
                ))}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-5 mb-3">Navigation</p>
              {NAV_LINKS.map(link => (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  className="flex items-center py-2.5 px-2 border-b border-gray-100 text-sm text-gray-700 last:border-0">
                  {link.label}
                </Link>
              ))}
              <a
                href={getWhatsAppSupportLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-bold"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}