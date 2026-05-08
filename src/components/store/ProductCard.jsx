import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useCart } from '@/lib/cartStore.jsx';
import { Badge } from '@/components/ui/badge';

export default function ProductCard({ product }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = React.useState(false);
  const inCart = items.some(i => i.id === product.id);

  const discount = product.compare_price && product.compare_price > product.price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🛒</div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && (
              <Badge className="bg-red-500 text-white border-0 text-xs font-bold">-{discount}%</Badge>
            )}
            {product.stock_status === 'low_stock' && (
              <Badge className="bg-amber-500 text-white border-0 text-xs">Low Stock</Badge>
            )}
            {product.stock_status === 'out_of_stock' && (
              <Badge className="bg-gray-500 text-white border-0 text-xs">Sold Out</Badge>
            )}
          </div>
        </div>

        <div className="mt-3 px-1">
          <h3 className="font-medium text-sm leading-tight line-clamp-2">{product.name}</h3>
          {product.weight && (
            <p className="text-xs text-muted-foreground mt-0.5">{product.weight}</p>
          )}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-heading font-bold text-lg">${product.price?.toFixed(2)}</span>
            {product.compare_price > product.price && (
              <span className="text-xs text-muted-foreground line-through">${product.compare_price?.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick Add */}
      {product.stock_status !== 'out_of_stock' && (
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleAdd}
          className={`absolute bottom-[5.5rem] right-2 p-2.5 rounded-full shadow-lg transition-colors ${
            added || inCart ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.button>
      )}
    </motion.div>
  );
}