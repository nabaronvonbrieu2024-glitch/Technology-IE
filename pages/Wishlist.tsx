import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-[#F7F5F2]">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
           <Heart size={40} className="text-stone-200" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#0F2A1D] mb-2">Your Wishlist is Empty</h2>
        <p className="text-[#1C1C1C]/50 mb-8 max-w-[240px] leading-relaxed">Save your favorite remedies and supplements for later.</p>
        <Link to="/catalog" className="bg-[#0F2A1D] text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-black transition-colors shadow-lg shadow-green-900/10">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F7F5F2] min-h-full pb-32">
      <h1 className="text-3xl font-serif font-bold text-[#0F2A1D] mb-8">My Wishlist</h1>

      <div className="space-y-6">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm border border-[#E5E0D8] group">
            <div className="flex gap-4">
              <Link to={`/product/${item.id}`} className="w-24 h-24 bg-[#F7F5F2] rounded-2xl flex-shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-serif font-bold text-[#1C1C1C] text-base leading-tight mb-1">{item.name}</h3>
                    </Link>
                    <button 
                      onClick={() => toggleWishlist(item)}
                      className="text-red-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-[#1C1C1C]/40 text-[10px] font-bold uppercase tracking-widest">{item.category}</p>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <span className="font-serif font-bold text-lg text-[#1C1C1C]">${item.price.toFixed(2)}</span>
                  
                  <button 
                    onClick={() => {
                      addToCart(item);
                      toggleWishlist(item); // Remove from wishlist after adding to cart? Or keep? User usually wants it removed once bought/added.
                    }}
                    className="bg-[#0F2A1D] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2"
                  >
                    <ShoppingBag size={14} /> Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;