import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileNav from './MobileNav';
import CartDrawer from './CartDrawer';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}