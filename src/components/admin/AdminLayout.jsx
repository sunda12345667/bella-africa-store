import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Tag, ShoppingBag, Users, Settings,
  ArrowLeft, LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import AdminLogin from './AdminLogin';

const ADMIN_LINKS = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/admin/customers', icon: Users, label: 'Customers' },
  { path: '/admin/promotions', icon: Tag, label: 'Promotions' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('bella_admin_auth') === '1');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    sessionStorage.removeItem('bella_admin_auth');
    setAuthed(false);
    navigate('/admin');
  };

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`fixed top-0 left-0 h-full w-60 bg-primary text-white flex flex-col z-40 transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          {/* Logo */}
          <div className="px-5 py-5 border-b border-white/10">
            <h1 className="text-xl font-black">BELLA <span className="text-accent">AFRICA</span></h1>
            <p className="text-xs text-white/40 mt-0.5">Admin Dashboard</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {ADMIN_LINKS.map(link => {
              const isActive = link.exact
                ? location.pathname === link.path
                : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <link.icon className="w-4 h-4 shrink-0" />
                  {link.label}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="px-3 pb-5 space-y-0.5 border-t border-white/10 pt-3">
            <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Store
            </Link>
            <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </aside>
      </>

      {/* Main */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b px-4 sm:px-6 h-14 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(s => !s)} className="md:hidden p-1.5 rounded-lg hover:bg-gray-100">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="text-sm font-semibold text-gray-700 capitalize">
                {ADMIN_LINKS.find(l => l.exact ? location.pathname === l.path : location.pathname.startsWith(l.path))?.label || 'Admin'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="text-sm text-gray-600 hidden sm:block">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-6 py-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}