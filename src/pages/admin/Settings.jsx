import React, { useState } from 'react';
import { Save, Store, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const STORAGE_KEY = 'bella_africa_settings';

const DEFAULTS = {
  store_name: 'Bella Africa Store',
  phone: '+1 (555) 123-4567',
  email: 'hello@bellaafrica.ca',
  address: 'Toronto, Ontario, Canada',
  whatsapp: '+15551234567',
  hours_weekday: '9am – 8pm',
  hours_weekend: '10am – 6pm',
  delivery_fee: '10.00',
  free_delivery_min: '80.00',
};

export default function Settings() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const [form, setForm] = useState({ ...DEFAULTS, ...saved });
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const save = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    toast.success('Settings saved!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Store Settings</h1>

      <form onSubmit={save} className="space-y-8 max-w-2xl">
        {/* Store Info */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Store className="w-4 h-4" /> Store Information</h2>
          <div className="space-y-4">
            <div>
              <Label>Store Name</Label>
              <Input value={form.store_name} onChange={e => update('store_name', e.target.value)} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Phone Number</Label>
                <Input value={form.phone} onChange={e => update('phone', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>WhatsApp Number</Label>
                <Input value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} className="mt-1" placeholder="+1xxxxxxxxxx" />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Address</Label>
              <Input value={form.address} onChange={e => update('address', e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Business Hours</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Mon – Fri</Label>
              <Input value={form.hours_weekday} onChange={e => update('hours_weekday', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Sat – Sun</Label>
              <Input value={form.hours_weekend} onChange={e => update('hours_weekend', e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Delivery Settings</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Delivery Fee ($)</Label>
              <Input type="number" step="0.01" value={form.delivery_fee} onChange={e => update('delivery_fee', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Free Delivery Over ($)</Label>
              <Input type="number" step="0.01" value={form.free_delivery_min} onChange={e => update('free_delivery_min', e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <Button type="submit" className="px-8">
          <Save className="w-4 h-4 mr-2" /> Save Settings
        </Button>
      </form>
    </div>
  );
}