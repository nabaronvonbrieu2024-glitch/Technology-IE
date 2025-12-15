import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { ChevronLeft, Star, Minus, Plus, ShoppingCart, Leaf, Info } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients'>('details');

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional feedback
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div className="bg-white min-h-screen relative pb-24">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white"
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>

      {/* Image Gallery */}
      <div className="w-full aspect-square bg-gray-100 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.isOrganic && (
           <div className="absolute bottom-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
             <Leaf size={12} fill="currentColor" /> ORGANIC
           </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 -mt-6 bg-white rounded-t-3xl relative z-0">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-gray-900 flex-1 mr-2">{product.name}</h1>
          <div className="text-2xl font-bold text-green-700">${product.price.toFixed(2)}</div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-yellow-400">
             {[...Array(5)].map((_, i) => (
               <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={2} className={i >= Math.floor(product.rating) ? "text-gray-300" : ""} />
             ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">{product.rating} ({product.reviews} reviews)</span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-6">
          <button 
            className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${activeTab === 'details' ? 'text-green-600' : 'text-gray-400'}`}
            onClick={() => setActiveTab('details')}
          >
            Description
            {activeTab === 'details' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full"></div>}
          </button>
          <button 
            className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${activeTab === 'ingredients' ? 'text-green-600' : 'text-gray-400'}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients & Benefits
            {activeTab === 'ingredients' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full"></div>}
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[150px]">
          {activeTab === 'details' ? (
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
              <br /><br />
              All our products are sourced from sustainable farms and are tested for purity and potency to ensure you get the best nature has to offer.
            </p>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">Key Ingredients</h4>
                <p className="text-sm text-gray-600">{product.ingredients || 'Natural herbal extracts.'}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">Benefits</h4>
                <ul className="grid grid-cols-1 gap-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-100 flex items-center gap-4 z-20">
        <div className="flex items-center bg-gray-100 rounded-lg h-12 px-2">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-green-600"
          >
            <Minus size={18} />
          </button>
          <span className="w-8 text-center font-bold text-gray-800">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-green-600"
          >
            <Plus size={18} />
          </button>
        </div>
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-green-600 hover:bg-green-700 active:scale-95 text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-200"
        >
          <ShoppingCart size={20} />
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;