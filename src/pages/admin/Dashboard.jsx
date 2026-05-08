import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Package, TrendingUp, AlertTriangle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategoryName } from '@/lib/categories';

export default function Dashboard() {
  const { data: products = [] } = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: () => base44.entities.Product.list('-created_date', 500),
  });

  const totalProducts = products.length;
  const featured = products.filter(p => p.is_featured).length;
  const lowStock = products.filter(p => p.stock_status === 'low_stock').length;
  const outOfStock = products.filter(p => p.stock_status === 'out_of_stock').length;

  const categoryCounts = {};
  products.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'text-blue-600 bg-blue-100' },
    { label: 'Featured', value: featured, icon: Star, color: 'text-amber-600 bg-amber-100' },
    { label: 'Low Stock', value: lowStock, icon: AlertTriangle, color: 'text-orange-600 bg-orange-100' },
    { label: 'Out of Stock', value: outOfStock, icon: AlertTriangle, color: 'text-red-600 bg-red-100' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Products by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm">{getCategoryName(cat)}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${(count / totalProducts) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}