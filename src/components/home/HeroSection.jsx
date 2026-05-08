import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1400&q=80',
    title: 'Shipping & Delivery',
    badge: 'Canada-Wide',
    desc: 'Local delivery in Toronto & GTA. Canada-wide shipping for all your African grocery needs.',
    cta: 'Shop Now',
    overlay: 'from-primary/80 via-primary/50 to-transparent',
  },
  {
    bg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80',
    title: 'Fresh African Groceries',
    badge: 'New Arrivals',
    desc: 'Authentic foodstuffs, spices and fresh produce sourced directly from Africa.',
    cta: 'Explore Now',
    overlay: 'from-black/70 via-black/40 to-transparent',
  },
  {
    bg: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?w=1400&q=80',
    title: 'Frozen Proteins & Meats',
    badge: 'Best Sellers',
    desc: 'Premium quality frozen meats and proteins. Order online, delivered fresh to your door.',
    cta: 'Order Now',
    overlay: 'from-primary/80 via-primary/50 to-transparent',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent(c => (c + 1) % SLIDES.length);

  const slide = SLIDES[current];

  return (
    <div className="relative w-full h-[320px] md:h-[480px] overflow-hidden bg-gray-100">
      {/* Background */}
      <img
        key={current}
        src={slide.bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded mb-3">
            {slide.badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3 max-w-lg">
            {slide.title}
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-md mb-6">{slide.desc}</p>
          <Link
            to="/shop"
            className="inline-block bg-accent text-accent-foreground font-bold px-7 py-3 rounded hover:bg-accent/90 transition-colors text-sm"
          >
            {slide.cta} →
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow">
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow">
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-accent' : 'bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}