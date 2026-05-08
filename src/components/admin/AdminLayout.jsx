import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, Image, ArrowLeft } from 'lucide-react';

const ADMIN_LINKS = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/promotions', icon: Tag, label: 'Promotions' },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Store
            </Link>
            <span className="text-border">|</span>
            <span className="font-heading font-bold text-lg">Admin</span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - desktop */}
        <aside className="hidden md:block w-56 border-r min-h-[calc(100vh-3.5rem)] p-4">
          <nav className="space-y-1">
            {ADMIN_LINKS.map(link => {
              const isActive = link.exact
                ? location.pathname === link.path
                : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden border-b w-full">
          <div className="flex overflow-x-auto px-4 py-2 gap-2">
            {ADMIN_LINKS.map(link => {
              const isActive = link.exact
                ? location.pathname === link.path
                : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                    isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <link.icon className="w-3 h-3" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="md:ml-56">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}