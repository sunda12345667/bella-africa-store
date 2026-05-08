import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, MessageCircle, ArrowLeft, Truck, Shield, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cartStore.jsx';
import { getCategoryName } from '@/lib/categories';
import { generateWhatsAppLink } from '@/lib/whatsappService';
import ProductCard from '@/components/store/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const results = await base44.entities.Product.filter({ id }, '-created_date', 1);
      return results[0];
    },
  });

  const { data: related = [] } = useQuery({
    queryKey: ['products', 'related', product?.category],
    queryFn: () => base44.entities.Product.filter({ category: product.category }, '-created_date', 5),
    enabled: !!product?.category,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-2xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-10 bg-muted rounded w-1/3" />
            <div className="h-24 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-4xl mb-4">😕</p>
        <h2 className="text-2xl font-heading font-bold">Product not found</h2>
        <Button asChild className="mt-4 rounded-full">
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const images = [product.image_url, ...(product.gallery_urls || [])].filter(Boolean);
  const discount = product.compare_price && product.compare_price > product.price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleWhatsAppOrder = () => {
    const link = generateWhatsAppLink({
      items: [{ name: product.name, quantity, price: product.price }],
      subtotal: product.price * quantity,
      name: '', address: '', phone: '', notes: '',
    });
    window.open(link, '_blank');
  };

  const filteredRelated = related.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Images */}
        <div>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square rounded-2xl overflow-hidden bg-muted"
          >
            {images[selectedImage] ? (
              <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">🛒</div>
            )}
          </motion.div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${i === selectedImage ? 'border-accent' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">{getCategoryName(product.category)}</Badge>
            {product.stock_status === 'in_stock' && <Badge className="bg-green-100 text-green-700 border-0 text-xs">In Stock</Badge>}
            {product.stock_status === 'low_stock' && <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">Low Stock</Badge>}
            {product.stock_status === 'out_of_stock' && <Badge className="bg-red-100 text-red-700 border-0 text-xs">Out of Stock</Badge>}
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold">{product.name}</h1>
          {product.weight && <p className="text-muted-foreground mt-1">{product.weight}</p>}

          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-heading font-bold">${product.price?.toFixed(2)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.compare_price?.toFixed(2)}</span>
                <Badge className="bg-red-500 text-white border-0">-{discount}%</Badge>
              </>
            )}
          </div>

          {product.description && (
            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>
          )}

          {/* Quantity + Add to Cart */}
          {product.stock_status !== 'out_of_stock' && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center border rounded-full">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-l-full">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-r-full">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleAddToCart} size="lg" className="flex-1 h-12 rounded-full font-medium">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button onClick={handleWhatsAppOrder} size="lg" variant="outline" className="h-12 rounded-full border-green-500 text-green-600 hover:bg-green-50">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: 'Fast Delivery' },
              { icon: Shield, label: 'Quality Assured' },
              { icon: Package, label: 'Fresh Products' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/50 text-center">
                <Icon className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Nutritional Info */}
          {product.nutritional_info && (
            <div className="mt-8 p-4 rounded-xl bg-muted/50">
              <h3 className="font-heading font-semibold mb-2">Nutritional Information</h3>
              <p className="text-sm text-muted-foreground">{product.nutritional_info}</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {filteredRelated.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filteredRelated.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}