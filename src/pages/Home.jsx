import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/home/HeroSection';
import ServiceIcons from '@/components/home/ServiceIcons';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function Home() {
  const { data: bestSellers = [] } = useQuery({
    queryKey: ['products', 'best_sellers'],
    queryFn: () => base44.entities.Product.filter({ is_best_seller: true }, '-created_date', 10),
  });

  const { data: featured = [] } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => base44.entities.Product.filter({ is_featured: true }, '-created_date', 10),
  });

  const { data: allProducts = [] } = useQuery({
    queryKey: ['products', 'recent'],
    queryFn: () => base44.entities.Product.list('-created_date', 10),
  });

  const displayBestSellers = bestSellers.length > 0 ? bestSellers : allProducts;
  const displayFeatured = featured.length > 0 ? featured : allProducts;

  return (
    <div className="bg-gray-50">
      <HeroSection />
      <ServiceIcons />
      <CategoriesSection />
      <FeaturedProducts
        products={displayBestSellers}
        title="Our Best Sellers"
        subtitle="African and Caribbean Groceries"
      />
      <FeaturedProducts
        products={displayFeatured}
        title="Featured Products"
        subtitle="Handpicked for You"
      />
      <NewsletterSection />
    </div>
  );
}