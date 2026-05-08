import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileNav from './MobileNav';
import CartDrawer from './CartDrawer';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}