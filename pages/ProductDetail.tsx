
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useI18n } from '../context/I18nContext';
import { ChevronLeft, Star, Minus, Plus, ShoppingBag, Leaf, Edit3, Heart } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, updateProductImage } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAdmin } = useAuth();
  const { showToast } = useToast();
  const { t } = useI18n();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients'>('details');

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="p-8 text-center text-stone-500 font-serif">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity} ${product.name} to your bag`);
  };

  const isSaved = isInWishlist(product.id);

  return (
    <div className="bg-[#F7F5F2] min-h-screen relative pb-48 font-sans">
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all active:scale-95 text-[#1C1C1C]"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="w-full aspect-square relative bg-white shadow-sm">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => toggleWishlist(product)}
          className={`absolute top-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
            isSaved ? 'bg-red-50 text-red-500' : 'bg-white/80 backdrop-blur-md text-stone-400'
          }`}
        >
          <Heart size={24} fill={isSaved ? "currentColor" : "none"} />
        </button>

        {product.isOrganic && (
           <div className="absolute bottom-8 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
             <Leaf size={14} fill="currentColor" /> {t('product.organic')}
           </div>
        )}
      </div>

      <div className="px-6 pt-8 pb-6 -mt-6 bg-[#F7F5F2] rounded-t-[2.5rem] relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col gap-1 mb-4">
          <p className="text-[10px] font-bold text-[#C6A75E] tracking-[0.2em] uppercase mb-1">{t(`cat.${product.category}`)}</p>
          <h1 className="text-3xl font-serif font-bold text-[#0F2A1D] leading-tight">{product.name}</h1>
        </div>

        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E5E0D8]">
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500 gap-0.5">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
               ))}
            </div>
            <span className="text-sm text-[#1C1C1C]/40 font-medium ml-1">{product.rating} <span className="opacity-30">|</span> {product.reviews} reviews</span>
          </div>
          <div className="flex items-baseline gap-1">
             <span className="text-lg font-serif text-[#1C1C1C]/40">$</span>
             <span className="text-3xl font-serif font-bold text-[#0F2A1D]">{product.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-8 border-b border-[#E5E0D8] mb-6">
          <button 
            className={`pb-3 text-xs font-bold uppercase tracking-[0.15em] transition-all relative ${activeTab === 'details' ? 'text-[#0F2A1D]' : 'text-[#1C1C1C]/30'}`}
            onClick={() => setActiveTab('details')}
          >
            {t('product.details')}
            {activeTab === 'details' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0F2A1D]"></div>}
          </button>
          <button 
            className={`pb-3 text-xs font-bold uppercase tracking-[0.15em] transition-all relative ${activeTab === 'ingredients' ? 'text-[#0F2A1D]' : 'text-[#1C1C1C]/30'}`}
            onClick={() => setActiveTab('ingredients')}
          >
            {t('product.botanicals')}
            {activeTab === 'ingredients' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0F2A1D]"></div>}
          </button>
        </div>

        <div className="min-h-[120px] mb-8">
          <p className="text-[#1C1C1C]/70 leading-relaxed font-light text-base">
            {activeTab === 'details' ? product.description : product.ingredients}
          </p>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto p-4 bg-white/90 backdrop-blur-xl border-t border-[#E5E0D8] flex items-center gap-3 z-30 shadow-lg">
        <button 
          onClick={() => toggleWishlist(product)}
          className={`w-14 h-14 rounded-full flex items-center justify-center border ${isSaved ? 'bg-red-50 text-red-500' : 'bg-[#F7F5F2]'}`}
        >
          <Heart size={24} fill={isSaved ? "currentColor" : "none"} />
        </button>

        <div className="flex-1 flex items-center bg-[#F7F5F2] rounded-full h-14 px-2 border border-[#E5E0D8]">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 text-[#1C1C1C]/40"><Minus size={18} /></button>
          <span className="w-8 text-center font-bold text-[#0F2A1D] text-lg">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="w-10 text-[#1C1C1C]/40"><Plus size={18} /></button>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="flex-[2] bg-[#0F2A1D] text-white h-14 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase"
        >
          {t('product.add')} <span className="opacity-30">|</span> ${(product.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
