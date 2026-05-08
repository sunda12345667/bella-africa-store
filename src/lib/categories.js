export const CATEGORIES = [
  { slug: 'african_foodstuff', name: 'African Foodstuff', icon: '🌾', description: 'Authentic staples from across Africa' },
  { slug: 'nigerian_groceries', name: 'Nigerian Groceries', icon: '🇳🇬', description: 'Beloved Nigerian pantry essentials' },
  { slug: 'frozen_foods', name: 'Frozen Foods', icon: '🧊', description: 'Premium frozen meats and seafood' },
  { slug: 'spices', name: 'Spices & Seasonings', icon: '🌶️', description: 'Aromatic spices and blends' },
  { slug: 'fresh_produce', name: 'Fresh Produce', icon: '🥬', description: 'Farm-fresh vegetables and fruits' },
  { slug: 'drinks', name: 'Drinks & Beverages', icon: '🥤', description: 'Refreshing African beverages' },
  { slug: 'snacks', name: 'Snacks', icon: '🍪', description: 'Delicious African snacks' },
  { slug: 'hair_products', name: 'Hair Products', icon: '💇', description: 'Premium African hair care' },
  { slug: 'beauty_products', name: 'Beauty Products', icon: '✨', description: 'Natural beauty essentials' },
  { slug: 'kitchen_essentials', name: 'Kitchen Essentials', icon: '🍳', description: 'Tools for the African kitchen' },
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find(c => c.slug === slug);
}

export function getCategoryName(slug) {
  return getCategoryBySlug(slug)?.name || slug;
}