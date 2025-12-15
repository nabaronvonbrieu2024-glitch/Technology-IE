import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ChevronLeft, Star, Minus, Plus, ShoppingBag, Leaf } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients'>('details');

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return <div className="p-8 text-center text-stone-500 font-serif">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity} ${product.name} to your bag`);
  };

  return (
    <div className="bg-stone-50 min-h-screen relative pb-32 font-sans">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all active:scale-95 text-stone-800"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Image Gallery */}
      <div className="w-full aspect-square relative bg-stone-200 shadow-2xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50"></div>
        {product.isOrganic && (
           <div className="absolute bottom-8 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
             <Leaf size={14} fill="currentColor" /> Certified Organic
           </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 pt-8 pb-6 -mt-6 bg-stone-50 rounded-t-[2.5rem] relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-1 mb-4">
          <p className="text-xs font-bold text-green-700 tracking-widest uppercase mb-1">{product.category}</p>
          <h1 className="text-3xl font-serif font-bold text-stone-900 leading-tight">{product.name}</h1>
        </div>

        <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500 gap-0.5">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={1.5} className={i >= Math.floor(product.rating) ? "text-stone-300" : ""} />
               ))}
            </div>
            <span className="text-sm text-stone-500 font-medium ml-1">{product.rating} <span className="text-stone-300">|</span> {product.reviews} reviews</span>
          </div>
          <div className="flex items-baseline gap-1">
             <span className="text-lg font-serif text-stone-500">$</span>
             <span className="text-3xl font-serif font-bold text-stone-900">{product.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-stone-200 mb-6">
          <button 
            className={`pb-3 text-sm font-bold tracking-wide transition-all relative ${activeTab === 'details' ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            onClick={() => setActiveTab('details')}
          >
            Description
            {activeTab === 'details' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-900"></div>}
          </button>
          <button 
            className={`pb-3 text-sm font-bold tracking-wide transition-all relative ${activeTab === 'ingredients' ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
            {activeTab === 'ingredients' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-900"></div>}
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[120px] mb-8">
          {activeTab === 'details' ? (
            <p className="text-stone-600 leading-relaxed font-light text-base">
              {product.description}
              <br /><br />
              <span className="text-stone-800 font-medium">Why we love it:</span> Sourced from sustainable farms, ensuring you receive nature's most potent benefits in their purest form.
            </p>
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-2xl border border-stone-100">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Active Ingredients</h4>
                <p className="text-stone-800 font-medium">{product.ingredients || 'Premium natural herbal extracts.'}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Key Benefits</h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-stone-700">
                      <div className="w-6 h-6 rounded-full bg-green-50 text-green-700 flex items-center justify-center mr-3">
                         <Leaf size={12} />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Action Bar - Glassmorphism */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/80 backdrop-blur-xl border-t border-stone-200 flex items-center gap-4 z-20 pb-8">
        <div className="flex items-center bg-stone-100 rounded-full h-14 px-2 border border-stone-200">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="w-8 text-center font-bold text-stone-900 text-lg">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-stone-900 text-white h-14 rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-3 shadow-xl shadow-stone-900/20 hover:bg-green-900 transition-all active:scale-[0.98]"
        >
          <ShoppingBag size={20} />
          Add to Bag <span className="opacity-40">|</span> ${(product.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;