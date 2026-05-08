import React from 'react';
import { Link } from 'react-router-dom';

export default function PromoBanner() {
  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Banner 1 */}
          <div className="relative rounded-2xl overflow-hidden h-44 bg-primary flex items-center shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&q=80"
              alt="Spices"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative px-8">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Special Offer</span>
              <h3 className="text-2xl font-black text-white mt-1 mb-2">African Spices<br />& Seasonings</h3>
              <Link to="/shop?category=spices" className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-2 rounded hover:bg-accent/90 transition-colors">
                Shop Spices →
              </Link>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative rounded-2xl overflow-hidden h-44 bg-green-800 flex items-center shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80"
              alt="Fresh Produce"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="relative px-8">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Fresh Stock</span>
              <h3 className="text-2xl font-black text-white mt-1 mb-2">Fresh Nigerian<br />Foodstuffs</h3>
              <Link to="/shop?category=fresh_foods" className="inline-block bg-white text-green-800 text-xs font-bold px-4 py-2 rounded hover:bg-gray-100 transition-colors">
                Shop Fresh →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}