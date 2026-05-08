import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoBanner from '@/components/home/PromoBanner';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import DeliverySection from '@/components/home/DeliverySection';
import NewsletterSection from '@/components/home/NewsletterSection';

const HERO_IMAGE = 'https://media.base44.com/images/public/69fe22c362ad59a81c04cf57/fa3963e5b_generated_09c62ee3.png';
const PROMO_IMAGE = 'https://media.base44.com/images/public/69fe22c362ad59a81c04cf57/de2325d76_generated_ad044c5f.png';

export default function Home() {
  const { data: featured = [] } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => base44.entities.Product.filter({ is_featured: true }, '-created_date', 8),
  });

  const { data: bestSellers = [] } = useQuery({
    queryKey: ['products', 'best_sellers'],
    queryFn: () => base44.entities.Product.filter({ is_best_seller: true }, '-created_date', 8),
  });

  const { data: allProducts = [] } = useQuery({
    queryKey: ['products', 'recent'],
    queryFn: () => base44.entities.Product.list('-created_date', 8),
  });

  const displayFeatured = featured.length > 0 ? featured : allProducts;
  const displayBestSellers = bestSellers.length > 0 ? bestSellers : [];

  return (
    <div>
      <HeroSection heroImage={HERO_IMAGE} />
      <CategoriesSection />
      <FeaturedProducts products={displayFeatured} title="Featured Products" subtitle="Handpicked for you" />
      <PromoBanner image={PROMO_IMAGE} title="Authentic Spices & Seasonings" subtitle="Elevate every dish with our premium collection of African spices, freshly ground and bursting with flavor." />
      {displayBestSellers.length > 0 && (
        <FeaturedProducts products={displayBestSellers} title="Best Sellers" subtitle="Customer favorites" />
      )}
      <DeliverySection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}