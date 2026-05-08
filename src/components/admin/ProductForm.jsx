import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { CATEGORIES } from '@/lib/categories';
// CATEGORIES now includes: fresh_foods, frozen_foods, spices, drinks, snacks, african_groceries, flour_fufu, rice_beans, oils_seasonings, seafood, meat_products, ready_to_eat, herbal_products, dairy_breakfast
import { Upload } from 'lucide-react';

export default function ProductForm({ product, onClose }) {
  const isEditing = !!product;
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    compare_price: product?.compare_price || '',
    category: product?.category || 'african_foodstuff',
    image_url: product?.image_url || '',
    stock_status: product?.stock_status || 'in_stock',
    stock_quantity: product?.stock_quantity || 0,
    weight: product?.weight || '',
    nutritional_info: product?.nutritional_info || '',
    is_featured: product?.is_featured || false,
    is_best_seller: product?.is_best_seller || false,
  });
  const [uploading, setUploading] = useState(false);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const mutation = useMutation({
    mutationFn: async (data) => {
      const payload = { ...data, price: Number(data.price), compare_price: data.compare_price ? Number(data.compare_price) : undefined, stock_quantity: Number(data.stock_quantity) };
      if (isEditing) {
        return base44.entities.Product.update(product.id, payload);
      }
      return base44.entities.Product.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(isEditing ? 'Product updated' : 'Product created');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Name *</Label>
        <Input value={form.name} onChange={e => update('name', e.target.value)} className="mt-1" required />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={form.description} onChange={e => update('description', e.target.value)} className="mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Price (CAD) *</Label>
          <Input type="number" step="0.01" value={form.price} onChange={e => update('price', e.target.value)} className="mt-1" required />
        </div>
        <div>
          <Label>Compare Price</Label>
          <Input type="number" step="0.01" value={form.compare_price} onChange={e => update('compare_price', e.target.value)} className="mt-1" placeholder="Original price" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Category</Label>
          <Select value={form.category} onValueChange={v => update('category', v)}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Stock Status</Label>
          <Select value={form.stock_status} onValueChange={v => update('stock_status', v)}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Weight / Size</Label>
        <Input value={form.weight} onChange={e => update('weight', e.target.value)} className="mt-1" placeholder="e.g. 1kg, 500ml" />
      </div>
      <div>
        <Label>Product Image</Label>
        <div className="mt-1 flex items-center gap-3">
          {form.image_url && (
            <img src={form.image_url} alt="" className="w-16 h-16 rounded-lg object-cover" />
          )}
          <label className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 text-sm">
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload Image'}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch checked={form.is_featured} onCheckedChange={v => update('is_featured', v)} />
          <Label>Featured</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={form.is_best_seller} onCheckedChange={v => update('is_best_seller', v)} />
          <Label>Best Seller</Label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="submit" disabled={mutation.isPending} className="flex-1">
          {mutation.isPending ? 'Saving...' : isEditing ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}