import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/categories';

export default function CategoriesSection() {
  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-primary/5 transition-colors group text-center"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/8 flex items-center justify-center text-2xl group-hover:bg-primary/15 transition-colors border border-primary/10">
                {cat.icon}
              </div>
              <span className="text-[10px] md:text-xs text-gray-600 font-medium leading-tight">{cat.name.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}