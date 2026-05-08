import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { getCategoryName } from '@/lib/categories';
import ProductForm from '@/components/admin/ProductForm';

export default function Products() {
  const [search, setSearch] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: () => base44.entities.Product.list('-created_date', 500),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Product.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      toast.success('Product deleted');
    },
  });

  const filtered = search
    ? products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()))
    : products;

  const openCreate = () => { setEditProduct(null); setShowForm(true); };
  const openEdit = (p) => { setEditProduct(p); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditProduct(null); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Products</h1>
        <Button onClick={openCreate} className="rounded-full">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-full" />
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted text-xs font-medium text-muted-foreground">
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3 hidden md:table-cell">Category</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3 hidden md:table-cell">Stock</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No products found</td></tr>
            ) : (
              filtered.map(product => (
                <tr key={product.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
                        {product.image_url ? (
                          <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">🛒</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-sm truncate">{product.name}</span>
                          {product.is_featured && <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">{getCategoryName(product.category)}</span>
                  </td>
                  <td className="p-3">
                    <span className="font-medium text-sm">${product.price?.toFixed(2)}</span>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <Badge variant="secondary" className={`text-xs ${
                      product.stock_status === 'in_stock' ? 'bg-green-100 text-green-700' :
                      product.stock_status === 'low_stock' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock_status?.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(product)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMutation.mutate(product.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">{editProduct ? 'Edit Product' : 'New Product'}</DialogTitle>
          </DialogHeader>
          <ProductForm product={editProduct} onClose={closeForm} />
        </DialogContent>
      </Dialog>
    </div>
  );
}