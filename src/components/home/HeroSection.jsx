import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&q=85',
    badge: '🇨🇦 Canada-Wide Delivery',
    title: 'Authentic African\nGroceries Delivered',
    desc: 'Serving Beaumont, Edmonton & all of Canada. Fresh African foodstuffs, spices and groceries — straight to your door.',
    cta: 'Shop Now',
    cta2: 'Order on WhatsApp',
    overlay: 'from-primary/90 via-primary/60 to-transparent',
  },
  {
    bg: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=1600&q=85',
    badge: '🌶️ New Stock Arrived',
    title: 'Nigerian Spices &\nSeasoning Blends',
    desc: 'Egusi, crayfish, suya spice, cameroon pepper and more. The taste of home, delivered to Alberta.',
    cta: 'Browse Spices',
    cta2: 'Order on WhatsApp',
    overlay: 'from-black/85 via-black/50 to-transparent',
  },
  {
    bg: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?w=1600&q=85',
    badge: '🧊 Frozen Proteins',
    title: 'Premium Frozen Meats\n& Seafood',
    desc: 'Ponmo, smoked turkey, cow feet, salted fish — halal-friendly frozen proteins delivered fresh.',
    cta: 'Shop Frozen',
    cta2: 'Order on WhatsApp',
    overlay: 'from-primary/85 via-primary/55 to-transparent',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent(c => (c + 1) % SLIDES.length);
  const slide = SLIDES[current];

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden bg-gray-900">
      <img
        key={current}
        src={slide.bg}
        alt="Bella Africa Store"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-90"
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />

      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-8 md:px-14 w-full">
          <div className="max-w-xl">
            <span className="inline-block bg-accent text-accent-foreground text-xs font-black px-3 py-1.5 rounded-full mb-4 tracking-wide">
              {slide.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="text-white/80 text-sm md:text-base mb-7 leading-relaxed">{slide.desc}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-block bg-accent text-accent-foreground font-black px-7 py-3 rounded-lg hover:bg-accent/90 transition-all text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {slide.cta} →
              </Link>
              <a
                href="https://wa.me/14388365678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-all text-sm shadow-lg"
              >
                <MessageCircle className="w-4 h-4" /> {slide.cta2}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors">
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors">
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${i === current ? 'bg-accent w-6 h-2.5' : 'bg-white/50 w-2.5 h-2.5'}`}
          />
        ))}
      </div>
    </div>
  );
}