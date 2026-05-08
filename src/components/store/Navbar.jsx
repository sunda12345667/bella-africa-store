import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cartStore.jsx';
import { CATEGORIES } from '@/lib/categories';

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
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground text-center text-xs py-2 px-4 hidden md:block">
        <span className="font-medium">Shop More, Save More</span>
        <span className="mx-4 opacity-40">|</span>
        <span>Need help? Call Us: <a href="tel:+15551234567" className="font-semibold hover:underline">+1 (555) 123-4567</a></span>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 h-16 md:h-20">
            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-1 shrink-0">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Logo */}
            <Link to="/" className="shrink-0">
              <div className="text-xl md:text-2xl font-black tracking-tight leading-none">
                <span className="text-primary">BELLA</span>
                <br className="hidden" />
                <span className="text-accent"> AFRICA</span>
              </div>
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 hidden md:flex">
              <div className="flex w-full max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="flex-1 h-11 px-5 border-2 border-gray-200 rounded-l-lg focus:outline-none focus:border-primary text-sm"
                />
                <button type="submit" className="h-11 px-5 bg-primary text-white rounded-r-lg hover:bg-primary/90 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-3 ml-auto md:ml-0 shrink-0">
              <Link to="/shop" className="md:hidden">
                <Search className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="hidden md:flex items-center gap-1 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-xs text-gray-500">24/7 Support</div>
                  <div className="font-semibold text-primary text-xs">+1 (555) 123-4567</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(true)} className="relative p-2 flex items-center gap-2">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 text-gray-700" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category nav bar */}
        <div className="bg-primary hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center">
              {/* Browse categories dropdown */}
              <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
                <button className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 font-semibold text-sm">
                  <Menu className="w-4 h-4" />
                  Browse All Categories
                  <ChevronDown className="w-4 h-4" />
                </button>
                {catOpen && (
                  <div className="absolute top-full left-0 bg-white shadow-xl border z-50 w-64 py-2">
                    {CATEGORIES.map(cat => (
                      <Link
                        key={cat.slug}
                        to={`/shop?category=${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 hover:text-primary"
                        onClick={() => setCatOpen(false)}
                      >
                        <span className="text-base">{cat.icon}</span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Nav links */}
              <nav className="flex items-center">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-5 py-3 text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-accent bg-primary/80'
                        : 'text-white hover:text-accent'
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setMobileOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-white z-[70] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-black">BELLA <span className="text-accent">AFRICA</span></span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Categories</p>
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/shop?category=${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-2.5 border-b border-gray-100 text-sm text-gray-700"
                >
                  <span>{cat.icon}</span> {cat.name}
                </Link>
              ))}
              <p className="text-xs font-semibold text-gray-400 uppercase mt-4 mb-3">Pages</p>
              {NAV_LINKS.map(link => (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  className="block py-2.5 border-b border-gray-100 text-sm text-gray-700">{link.label}</Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}