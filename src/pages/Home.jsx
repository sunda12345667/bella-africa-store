import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/home/HeroSection';
import ServiceIcons from '@/components/home/ServiceIcons';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoBanner from '@/components/home/PromoBanner';
import DeliverySection from '@/components/home/DeliverySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import WhatsAppOrderSection from '@/components/home/WhatsAppOrderSection';

export default function Home() {
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: () => base44.entities.Product.list('-created_date', 200),
  });

  const bestSellers = allProducts.filter(p => p.is_best_seller).slice(0, 10);
  const featured = allProducts.filter(p => p.is_featured).slice(0, 10);
  const displayBest = bestSellers.length >= 4 ? bestSellers : allProducts.slice(0, 10);
  const displayFeatured = featured.length >= 4 ? featured : allProducts.slice(10, 20);

  return (
    <div className="bg-gray-50">
      <HeroSection />
      <ServiceIcons />
      <CategoriesSection />
      <FeaturedProducts
        products={displayBest}
        title="Our Best Sellers"
        subtitle="Most Popular Products"
        loading={!allProducts.length}
      />
      <PromoBanner />
      <FeaturedProducts
        products={displayFeatured}
        title="Featured Products"
        subtitle="Handpicked for You"
        loading={!allProducts.length}
      />
      <WhatsAppOrderSection />
      <DeliverySection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}