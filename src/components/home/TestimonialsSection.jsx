import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Adaeze O.', city: 'Edmonton, AB', text: 'Finally found a store that carries all the Nigerian ingredients I need. The egusi, crayfish and ponmo are always fresh. Delivery was same day!', stars: 5 },
  { name: 'Kwame A.', city: 'Calgary, AB', text: 'Best African grocery store in Alberta. I order every two weeks and they never disappoint. The Ola Ola pounded yam is always in stock.', stars: 5 },
  { name: 'Fatima B.', city: 'Beaumont, AB', text: 'WhatsApp ordering is so easy! I just send them my list and they confirm and deliver. The quality of their frozen foods is excellent.', stars: 5 },
  { name: 'Chukwudi E.', city: 'Leduc, AB', text: 'The suya spice and cameroon pepper are authentic — exactly like home. Bella Africa is the real deal for diaspora Nigerians in Canada.', stars: 5 },
];

export default function TestimonialsSection() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Customer Reviews</span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mt-2">What Our Customers Say ⭐</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map(r => (
            <div key={r.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">"{r.text}"</p>
              <div>
                <p className="font-bold text-sm text-gray-800">{r.name}</p>
                <p className="text-xs text-gray-400">{r.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}