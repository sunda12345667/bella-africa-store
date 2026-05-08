import React from 'react';
import { Truck, Clock, Package, MapPin, CheckCircle } from 'lucide-react';

export default function DeliverySection() {
  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Fast & Reliable</span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mt-2">Fresh African Foods Delivered 🚚</h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
            We serve Beaumont, Edmonton and surrounding Alberta areas with same-day delivery, and ship Canada-wide via Canada Post and Purolator.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { icon: Zap, title: 'Same Day', desc: 'Beaumont & Edmonton', color: 'bg-orange-50 text-orange-600 border-orange-100' },
            { icon: Truck, title: 'Canada-Wide', desc: '3–7 business days', color: 'bg-blue-50 text-blue-600 border-blue-100' },
            { icon: Package, title: 'Careful Packing', desc: 'All items packed safely', color: 'bg-green-50 text-green-600 border-green-100' },
            { icon: MapPin, title: 'Pickup Available', desc: '3817 46th Ave, Beaumont', color: 'bg-purple-50 text-purple-600 border-purple-100' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className={`flex flex-col items-center text-center p-5 rounded-xl border ${color}`}>
              <Icon className="w-7 h-7 mb-3" />
              <p className="font-bold text-sm text-gray-800">{title}</p>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
          <h3 className="font-black text-gray-800 text-lg mb-4">Delivery Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Free delivery on orders over CAD $80 in Beaumont & Edmonton',
              'Flat rate CAD $10 delivery fee under $80',
              'Canada-wide shipping available on all products',
              'Same-day orders must be placed before 2pm',
              'Frozen products packed with dry ice for long-distance',
              'WhatsApp confirmation sent on every order',
            ].map(item => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Zap({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}