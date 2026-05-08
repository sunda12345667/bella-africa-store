import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Phone, User, FileText, MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCart } from '@/lib/cartStore.jsx';
import { generateWhatsAppLink } from '@/lib/whatsappService';

const STEPS = [
  { id: 1, label: 'Your Details', icon: User },
  { id: 2, label: 'Delivery', icon: MapPin },
  { id: 3, label: 'Review', icon: FileText },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });
  const [sending, setSending] = useState(false);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSendToWhatsApp = () => {
    setSending(true);
    setTimeout(() => {
      const link = generateWhatsAppLink({ items, subtotal, ...form });
      window.location.href = link;
      clearCart();
      setSending(false);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-2xl font-heading font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground mt-2">Add some products before checking out</p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/shop">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </Link>

      <h1 className="text-3xl font-heading font-bold mb-2">WhatsApp Checkout</h1>
      <p className="text-muted-foreground mb-8">Complete your details and we'll send your order to <strong className="text-green-700">+1 438-836-5678</strong> via WhatsApp</p>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <button
              onClick={() => s.id < step && setStep(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                step >= s.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {step > s.id ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && <div className="flex-1 h-px bg-border" />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
              <Input id="name" placeholder="Enter your full name" value={form.name} onChange={e => update('name', e.target.value)} className="mt-1.5 h-12 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => update('phone', e.target.value)} className="mt-1.5 h-12 rounded-xl" />
            </div>
            <Button onClick={() => setStep(2)} disabled={!form.name || !form.phone} className="w-full h-12 rounded-full font-medium">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div>
              <Label htmlFor="address" className="text-sm font-medium">Delivery Address</Label>
              <Textarea id="address" placeholder="Enter your full delivery address" value={form.address} onChange={e => update('address', e.target.value)} className="mt-1.5 rounded-xl min-h-[100px]" />
            </div>
            <div>
              <Label htmlFor="notes" className="text-sm font-medium">Additional Notes (optional)</Label>
              <Textarea id="notes" placeholder="Any special instructions?" value={form.notes} onChange={e => update('notes', e.target.value)} className="mt-1.5 rounded-xl" />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!form.address} className="flex-1 h-12 rounded-full font-medium">
                Review Order <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            {/* Order Summary */}
            <div className="bg-card border rounded-2xl p-5 space-y-3">
              <h3 className="font-heading font-semibold text-lg">Order Summary</h3>
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="font-medium">CAD ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-heading font-bold text-lg">
                <span>Total</span>
                <span>CAD ${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-card border rounded-2xl p-5 space-y-2 text-sm">
              <h3 className="font-heading font-semibold text-lg mb-3">Your Details</h3>
              <div className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /> {form.name}</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground" /> {form.phone}</div>
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-muted-foreground mt-0.5" /> {form.address}</div>
              {form.notes && <div className="flex items-start gap-2"><FileText className="w-4 h-4 text-muted-foreground mt-0.5" /> {form.notes}</div>}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12 rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button
                onClick={handleSendToWhatsApp}
                disabled={sending}
                className="flex-1 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                {sending ? (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Order...
                  </motion.span>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send via WhatsApp
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}