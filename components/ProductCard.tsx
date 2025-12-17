import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

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
      className="group block bg-white rounded-[20px] p-4 shadow-[0_2px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500"
    >
      <div className="flex gap-5">
        {/* Image Container */}
        <div className="w-32 h-32 relative rounded-2xl overflow-hidden bg-[#F7F5F2] flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center py-1">
          <div className="mb-2">
            <span className="text-[10px] text-[#9DB8A0] font-bold tracking-widest uppercase mb-1 block">
              {product.category.replace('_', ' ')}
            </span>
            <h3 className="font-serif text-lg text-[#1C1C1C] leading-[1.2] mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-[#1C1C1C]/50 font-light line-clamp-1">
              {product.benefits[0]}
            </p>
          </div>
          
          <div className="mt-auto flex items-center justify-between">
            <span className="text-base font-medium text-[#1C1C1C]">
              ${product.price.toFixed(2)}
            </span>
            
            <button 
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-full bg-[#F7F5F2] text-[#0F2A1D] flex items-center justify-center hover:bg-[#0F2A1D] hover:text-[#F7F5F2] transition-all duration-300"
              aria-label="Add to cart"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;