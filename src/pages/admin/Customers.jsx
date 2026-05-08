import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Users, Plus, Pencil, Trash2, Search, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function Customers() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const queryClient = useQueryClient();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['admin', 'customers'],
    queryFn: () => base44.entities.Customer.list('-created_date', 200),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Customer.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'customers'] });
      toast.success('Customer deleted');
    },
  });

  const filtered = search
    ? customers.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()) || c.phone?.includes(search) || c.email?.toLowerCase().includes(search.toLowerCase()))
    : customers;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <Button onClick={() => { setEditCustomer(null); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Customer
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search by name, phone, email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No customers found</p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3 hidden md:table-cell">Phone</th>
                <th className="text-left p-3 hidden md:table-cell">Email</th>
                <th className="text-left p-3 hidden lg:table-cell">City</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium text-sm text-gray-800">{c.name}</td>
                  <td className="p-3 hidden md:table-cell text-sm text-gray-500">{c.phone}</td>
                  <td className="p-3 hidden md:table-cell text-sm text-gray-500">{c.email}</td>
                  <td className="p-3 hidden lg:table-cell text-sm text-gray-500">{c.city}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditCustomer(c); setShowForm(true); }}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => deleteMutation.mutate(c.id)}>
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
            <DialogTitle>{editCustomer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
          </DialogHeader>
          <CustomerForm customer={editCustomer} onClose={() => { setShowForm(false); setEditCustomer(null); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CustomerForm({ customer, onClose }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: customer?.name || '',
    phone: customer?.phone || '',
    email: customer?.email || '',
    city: customer?.city || '',
    address: customer?.address || '',
    notes: customer?.notes || '',
  });
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const mutation = useMutation({
    mutationFn: (data) => customer ? base44.entities.Customer.update(customer.id, data) : base44.entities.Customer.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'customers'] });
      toast.success(customer ? 'Customer updated' : 'Customer added');
      onClose();
    },
  });

  return (
    <form onSubmit={e => { e.preventDefault(); mutation.mutate(form); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Full Name</Label>
          <Input value={form.name} onChange={e => update('name', e.target.value)} className="mt-1" required />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={form.phone} onChange={e => update('phone', e.target.value)} className="mt-1" />
        </div>
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>City</Label>
          <Input value={form.city} onChange={e => update('city', e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Address</Label>
          <Input value={form.address} onChange={e => update('address', e.target.value)} className="mt-1" />
        </div>
      </div>
      <div>
        <Label>Notes</Label>
        <Input value={form.notes} onChange={e => update('notes', e.target.value)} className="mt-1" placeholder="VIP, preferences, etc." />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="submit" disabled={mutation.isPending} className="flex-1">{mutation.isPending ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  );
}