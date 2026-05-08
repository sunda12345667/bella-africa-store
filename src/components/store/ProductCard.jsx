import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/lib/cartStore.jsx';

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
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🛒</div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-{discount}%</span>
            )}
            {product.stock_status === 'out_of_stock' && (
              <span className="bg-gray-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Out of Stock</span>
            )}
            {product.stock_status === 'in_stock' && (
              <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded">In Stock</span>
            )}
          </div>
        </div>

        <div className="p-3">
          <p className="text-xs text-primary font-medium mb-1 truncate">
            {product.category?.replace(/_/g, ' ')}
          </p>
          <h3 className="font-semibold text-sm text-gray-800 leading-tight line-clamp-2 mb-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-gray-900">${product.price?.toFixed(2)}</span>
            {product.compare_price > product.price && (
              <span className="text-xs text-gray-400 line-through">${product.compare_price?.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      {product.stock_status !== 'out_of_stock' && (
        <div className="px-3 pb-3">
          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded text-sm font-semibold transition-colors ${
              added || inCart
                ? 'bg-green-600 text-white'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            {added ? 'Added!' : inCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      )}
    </div>
  );
}