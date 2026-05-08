import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/store/ProductCard';

export default function FeaturedProducts({ products = [], title, subtitle }) {
  if (!products.length) return null;

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {subtitle && <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">{subtitle}</p>}
            <h2 className="text-xl md:text-2xl font-black text-gray-800">{title}</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.slice(0, 10).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}