import React from 'react';
import { Truck, ShoppingBag, MapPin, Headphones } from 'lucide-react';

const SERVICES = [
  { icon: Truck, title: 'We ship all over Canada!', desc: 'Nationwide delivery to your door' },
  { icon: ShoppingBag, title: 'Instant & Same-Day Delivery', desc: 'Available in Toronto & GTA' },
  { icon: MapPin, title: 'Multiple Pickup Locations', desc: 'Pick up at any of our stores' },
  { icon: Headphones, title: '24/7 Customer Support', desc: 'Always here to help you' },
];

export default function ServiceIcons() {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gray-100">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 py-5 px-4 md:px-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800 leading-tight">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}