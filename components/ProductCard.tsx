import React from 'react';
import { Product } from '../types';
import { Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`Added ${product.name} to bag`);
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group block bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {product.isOrganic && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-stone-800 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
            ORGANIC
          </span>
        )}
        
        {/* Quick Add Button Overlay */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur text-stone-900 rounded-full flex items-center justify-center shadow-lg hover:bg-green-800 hover:text-white transition-all active:scale-95"
          aria-label="Quick Add to Cart"
        >
          <ShoppingBag size={18} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1 gap-2">
          <p className="text-[10px] text-green-700 font-bold tracking-widest uppercase">{product.category}</p>
          <div className="flex items-center gap-1">
            <Star size={10} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-medium text-stone-500">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-serif text-base font-bold text-stone-900 leading-tight mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-medium text-stone-400">$</span>
          <span className="text-lg font-bold text-stone-900">{product.price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;