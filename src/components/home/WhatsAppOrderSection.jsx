import React from 'react';
import { MessageCircle, Clock, MapPin, Star } from 'lucide-react';

export default function WhatsAppOrderSection() {
  return (
    <section className="py-14 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 tracking-widest uppercase">
              WhatsApp Ordering
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              Order in Seconds<br />via <span className="text-accent">WhatsApp</span>
            </h2>
            <p className="text-white/70 text-base mb-6 leading-relaxed">
              No account needed. No complex checkout. Just browse, add to cart, and send us a WhatsApp message. We'll confirm your order and arrange delivery.
            </p>
            <div className="space-y-3 mb-8">
              {[
                '1. Browse and add items to your cart',
                '2. Click "Order on WhatsApp"',
                '3. Your order is auto-formatted and sent',
                '4. We confirm and arrange delivery',
              ].map(step => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full shrink-0" />
                  <span className="text-sm text-white/80">{step}</span>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/14388365678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-black px-8 py-4 rounded-xl text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with Us: +1 438-836-5678
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: MessageCircle, label: 'WhatsApp Orders', value: '24/7 Available', color: 'bg-green-500' },
              { icon: Clock, label: 'Fast Delivery', value: 'Same Day in Beaumont', color: 'bg-accent' },
              { icon: MapPin, label: 'Location', value: '3817 46th Ave, Beaumont AB', color: 'bg-blue-500' },
              { icon: Star, label: 'Happy Customers', value: '500+ Orders Served', color: 'bg-purple-500' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-sm text-white">{label}</p>
                <p className="text-xs text-white/60 mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}