import React from 'react';
import { Truck, Zap, MapPin, MessageCircle } from 'lucide-react';

const SERVICES = [
  { icon: Truck, title: 'Canada-Wide Shipping', desc: 'We ship everywhere in Canada', color: 'bg-blue-50 text-blue-600' },
  { icon: Zap, title: 'Same-Day Delivery', desc: 'Beaumont & Edmonton area', color: 'bg-orange-50 text-orange-600' },
  { icon: MapPin, title: 'Pickup Available', desc: '3817 46th Ave, Beaumont AB', color: 'bg-green-50 text-green-600' },
  { icon: MessageCircle, title: 'WhatsApp Orders', desc: '+1 438-836-5678', color: 'bg-purple-50 text-purple-600' },
];

export default function ServiceIcons() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc, color }, i) => (
            <div key={title} className={`flex items-center gap-3 py-4 px-4 md:px-6 ${i < 3 ? 'border-r border-gray-100' : ''}`}>
              <div className={`w-11 h-11 rounded-full ${color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}