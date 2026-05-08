import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ShoppingBag, Plus, Pencil, Trash2, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function Orders() {
  const [showForm, setShowForm] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: () => base44.entities.Order.list('-created_date', 200),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Order.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      toast.success('Order deleted');
    },
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Order.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] }),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <Button onClick={() => { setEditOrder(null); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-2" /> New Order
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No orders yet</p>
          <p className="text-sm text-gray-400">Orders placed via WhatsApp will appear here once added manually.</p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3 hidden md:table-cell">Items</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <p className="font-medium text-sm text-gray-800">{order.customer_name}</p>
                    <p className="text-xs text-gray-400">{order.phone}</p>
                  </td>
                  <td className="p-3 hidden md:table-cell text-sm text-gray-500">{order.items_summary}</td>
                  <td className="p-3 font-bold text-sm">${order.total?.toFixed(2)}</td>
                  <td className="p-3">
                    <Select value={order.status || 'pending'} onValueChange={v => updateStatus.mutate({ id: order.id, status: v })}>
                      <SelectTrigger className="h-7 text-xs w-32 border-none p-0">
                        <Badge className={`text-xs cursor-pointer ${STATUS_COLORS[order.status] || STATUS_COLORS.pending}`}>
                          {order.status || 'pending'}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(STATUS_COLORS).map(s => (
                          <SelectItem key={s} value={s} className="text-xs capitalize">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditOrder(order); setShowForm(true); }}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => deleteMutation.mutate(order.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editOrder ? 'Edit Order' : 'New Order'}</DialogTitle>
          </DialogHeader>
          <OrderForm order={editOrder} onClose={() => { setShowForm(false); setEditOrder(null); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OrderForm({ order, onClose }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    customer_name: order?.customer_name || '',
    phone: order?.phone || '',
    address: order?.address || '',
    items_summary: order?.items_summary || '',
    total: order?.total || '',
    status: order?.status || 'pending',
    notes: order?.notes || '',
  });
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const mutation = useMutation({
    mutationFn: (data) => {
      const payload = { ...data, total: Number(data.total) };
      if (order) return base44.entities.Order.update(order.id, payload);
      return base44.entities.Order.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      toast.success(order ? 'Order updated' : 'Order created');
      onClose();
    },
  });

  return (
    <form onSubmit={e => { e.preventDefault(); mutation.mutate(form); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Customer Name</Label>
          <Input value={form.customer_name} onChange={e => update('customer_name', e.target.value)} className="mt-1" required />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={form.phone} onChange={e => update('phone', e.target.value)} className="mt-1" />
        </div>
      </div>
      <div>
        <Label>Delivery Address</Label>
        <Input value={form.address} onChange={e => update('address', e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label>Items Summary</Label>
        <Input value={form.items_summary} onChange={e => update('items_summary', e.target.value)} className="mt-1" placeholder="e.g. 2x Egusi, 1x Palm Oil" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Total ($)</Label>
          <Input type="number" step="0.01" value={form.total} onChange={e => update('total', e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Status</Label>
          <Select value={form.status} onValueChange={v => update('status', v)}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              {['pending','confirmed','processing','shipped','delivered','cancelled'].map(s => (
                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Notes</Label>
        <Input value={form.notes} onChange={e => update('notes', e.target.value)} className="mt-1" placeholder="Any special instructions..." />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="submit" disabled={mutation.isPending} className="flex-1">{mutation.isPending ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  );
}