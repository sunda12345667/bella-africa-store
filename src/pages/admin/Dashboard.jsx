import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Package, AlertTriangle, Star, ShoppingBag, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategoryName } from '@/lib/categories';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data: products = [] } = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: () => base44.entities.Product.list('-created_date', 500),
  });
  const { data: orders = [] } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: () => base44.entities.Order.list('-created_date', 200),
  });
  const { data: customers = [] } = useQuery({
    queryKey: ['admin', 'customers'],
    queryFn: () => base44.entities.Customer.list('-created_date', 200),
  });

  const totalProducts = products.length;
  const featured = products.filter(p => p.is_featured).length;
  const lowStock = products.filter(p => p.stock_status === 'low_stock').length;
  const outOfStock = products.filter(p => p.stock_status === 'out_of_stock').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const categoryCounts = {};
  products.forEach(p => { categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1; });

  const recentOrders = orders.slice(0, 5);

  const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-purple-100 text-purple-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: totalProducts, icon: Package, color: 'text-blue-600 bg-blue-100' },
          { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-600 bg-green-100' },
          { label: 'Pending Orders', value: pendingOrders, icon: ShoppingBag, color: 'text-amber-600 bg-amber-100' },
          { label: 'Customers', value: customers.length, icon: Users, color: 'text-purple-600 bg-purple-100' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Featured', value: featured, icon: Star, color: 'text-amber-600 bg-amber-100' },
          { label: 'Low Stock', value: lowStock, icon: AlertTriangle, color: 'text-orange-600 bg-orange-100' },
          { label: 'Out of Stock', value: outOfStock, icon: AlertTriangle, color: 'text-red-600 bg-red-100' },
          { label: 'Total Orders', value: orders.length, icon: TrendingUp, color: 'text-teal-600 bg-teal-100' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Recent Orders</CardTitle>
            <Link to="/admin/orders" className="text-xs text-primary font-medium hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="p-0">
            {recentOrders.length === 0 ? (
              <p className="text-center py-8 text-sm text-gray-400">No orders yet</p>
            ) : (
              <div className="divide-y">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{order.customer_name}</p>
                      <p className="text-xs text-gray-400">{order.items_summary}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">${order.total?.toFixed(2)}</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${STATUS_COLORS[order.status] || STATUS_COLORS.pending}`}>
                        {order.status || 'pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Products by Category */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Products by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(categoryCounts).length === 0 ? (
              <p className="text-center py-8 text-sm text-gray-400">No products yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{getCategoryName(cat)}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(count / totalProducts) * 100}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-600 w-5 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}