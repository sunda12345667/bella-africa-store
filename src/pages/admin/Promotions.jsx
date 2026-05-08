import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Promotions() {
  const [showForm, setShowForm] = useState(false);
  const [editPromo, setEditPromo] = useState(null);
  const queryClient = useQueryClient();

  const { data: promos = [] } = useQuery({
    queryKey: ['admin', 'promotions'],
    queryFn: () => base44.entities.Promotion.list('-created_date', 50),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Promotion.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
      toast.success('Promotion deleted');
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Promotions</h1>
        <Button onClick={() => { setEditPromo(null); setShowForm(true); }} className="rounded-full">
          <Plus className="w-4 h-4 mr-2" /> Add Promotion
        </Button>
      </div>

      <div className="grid gap-4">
        {promos.map(promo => (
          <Card key={promo.id}>
            <CardContent className="p-4 flex items-center gap-4">
              {promo.image_url && (
                <img src={promo.image_url} alt="" className="w-20 h-14 rounded-lg object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium">{promo.title}</h3>
                <p className="text-sm text-muted-foreground">{promo.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditPromo(promo); setShowForm(true); }}>
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMutation.mutate(promo.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {promos.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No promotions yet</div>
        )}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">{editPromo ? 'Edit Promotion' : 'New Promotion'}</DialogTitle>
          </DialogHeader>
          <PromoForm promo={editPromo} onClose={() => { setShowForm(false); setEditPromo(null); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PromoForm({ promo, onClose }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: promo?.title || '',
    subtitle: promo?.subtitle || '',
    image_url: promo?.image_url || '',
    discount_percent: promo?.discount_percent || '',
    promo_code: promo?.promo_code || '',
    is_active: promo?.is_active ?? true,
    position: promo?.position || 'banner',
  });
  const [uploading, setUploading] = useState(false);
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const mutation = useMutation({
    mutationFn: async (data) => {
      const payload = { ...data, discount_percent: data.discount_percent ? Number(data.discount_percent) : undefined };
      if (promo) return base44.entities.Promotion.update(promo.id, payload);
      return base44.entities.Promotion.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
      toast.success(promo ? 'Updated' : 'Created');
      onClose();
    },
  });

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    update('image_url', file_url);
    setUploading(false);
  };

  return (
    <form onSubmit={e => { e.preventDefault(); mutation.mutate(form); }} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input value={form.title} onChange={e => update('title', e.target.value)} className="mt-1" required />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input value={form.subtitle} onChange={e => update('subtitle', e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label>Image</Label>
        <div className="mt-1 flex items-center gap-3">
          {form.image_url && <img src={form.image_url} alt="" className="w-16 h-12 rounded-lg object-cover" />}
          <label className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg cursor-pointer text-sm">
            <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload'}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Promo Code</Label>
          <Input value={form.promo_code} onChange={e => update('promo_code', e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Position</Label>
          <Select value={form.position} onValueChange={v => update('position', v)}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="hero">Hero</SelectItem>
              <SelectItem value="banner">Banner</SelectItem>
              <SelectItem value="popup">Popup</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={form.is_active} onCheckedChange={v => update('is_active', v)} />
        <Label>Active</Label>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="submit" disabled={mutation.isPending} className="flex-1">{mutation.isPending ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  );
}