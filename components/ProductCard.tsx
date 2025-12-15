import React from 'react';
import { Product } from '../types';
import { Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.isOrganic && (
          <span className="absolute top-2 left-2 bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">
            ORGANIC
          </span>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{product.category}</p>
          <div className="flex items-center gap-0.5 text-yellow-400">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-medium text-gray-600">{product.rating}</span>
          </div>
        </div>
        <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-green-700">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="w-8 h-8 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;