export const CATEGORIES = [
  { slug: 'fresh_foods',        name: 'Fresh Foods',        icon: '🥬', description: 'Farm-fresh African vegetables and ingredients' },
  { slug: 'frozen_foods',       name: 'Frozen Foods',       icon: '🧊', description: 'Premium frozen meats, seafood and proteins' },
  { slug: 'spices',             name: 'Spices & Seasonings', icon: '🌶️', description: 'Aromatic African spices and blends' },
  { slug: 'drinks',             name: 'Drinks & Beverages', icon: '🥤', description: 'Refreshing African and Nigerian beverages' },
  { slug: 'snacks',             name: 'Snacks',             icon: '🍪', description: 'Delicious African snacks and treats' },
  { slug: 'african_groceries',  name: 'African Groceries',  icon: '🌾', description: 'Authentic staples from across Africa' },
  { slug: 'flour_fufu',         name: 'Flour & Fufu',       icon: '🫙', description: 'Yam flour, fufu, plantain and more' },
  { slug: 'rice_beans',         name: 'Rice & Beans',       icon: '🍚', description: 'Garri, beans, and grain essentials' },
  { slug: 'oils_seasonings',    name: 'Oils & Seasonings',  icon: '🫒', description: 'Palm oil, palmnut cream and cooking oils' },
  { slug: 'seafood',            name: 'Seafood',            icon: '🐟', description: 'Dried fish, crayfish and smoked seafood' },
  { slug: 'meat_products',      name: 'Meat Products',      icon: '🥩', description: 'Ponmo, turkey, cow feet and proteins' },
  { slug: 'ready_to_eat',       name: 'Ready to Eat',       icon: '🍱', description: 'Suya, pepper soup, noodles and more' },
  { slug: 'herbal_products',    name: 'Herbal Products',    icon: '🌿', description: 'Traditional African herbal mixtures' },
  { slug: 'dairy_breakfast',    name: 'Dairy & Breakfast',  icon: '🥛', description: 'Milo, Peak Milk, custard and cereals' },
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find(c => c.slug === slug);
}

export function getCategoryName(slug) {
  return getCategoryBySlug(slug)?.name || slug?.replace(/_/g, ' ') || '';
}