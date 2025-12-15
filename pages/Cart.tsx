import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const deliveryFee = cartTotal > 50 ? 0 : 5.99;
  const finalTotal = cartTotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-stone-50">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
           <ShoppingBag size={40} className="text-stone-300" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Your Bag is Empty</h2>
        <p className="text-stone-500 mb-8 max-w-[240px] leading-relaxed">Discover our collection of natural remedies and supplements.</p>
        <Link to="/catalog" className="bg-stone-900 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-green-900 transition-colors shadow-lg shadow-stone-900/10">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-stone-50 min-h-full pb-40">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Shopping Bag</h1>

      {/* Cart Items List */}
      <div className="space-y-6 mb-10">
        {items.map(item => (
          <div key={item.id} className="group flex gap-4 bg-white p-4 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
            <div className="w-24 h-24 bg-stone-100 rounded-2xl flex-shrink-0 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-serif font-bold text-stone-900 text-base leading-tight mb-1">{item.name}</h3>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-stone-300 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-stone-500 text-xs font-medium uppercase tracking-wider">{item.category}</p>
              </div>
              
              <div className="flex justify-between items-end mt-3">
                <span className="font-serif font-bold text-lg text-stone-900">${item.price.toFixed(2)}</span>
                
                <div className="flex items-center bg-stone-50 rounded-full h-8 px-1 border border-stone-200">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-full flex items-center justify-center text-stone-500 hover:text-stone-900"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-stone-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-full flex items-center justify-center text-stone-500 hover:text-stone-900"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
        <h3 className="font-serif font-bold text-stone-900 text-lg">Order Summary</h3>
        <div className="flex justify-between text-sm text-stone-600">
          <span>Subtotal</span>
          <span className="font-medium">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-stone-600">
          <span>Delivery</span>
          <span className={deliveryFee === 0 ? "text-green-700 font-medium" : "font-medium"}>
            {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
          </span>
        </div>
        <div className="border-t border-dashed border-stone-200 pt-4 mt-2 flex justify-between items-center">
          <span className="font-bold text-stone-900">Total</span>
          <span className="font-serif font-bold text-2xl text-stone-900">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto p-4 z-30">
         <button 
            onClick={() => alert("Proceeding to secure checkout...")}
            className="w-full bg-stone-900 text-white h-14 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-green-900 transition-colors shadow-xl shadow-stone-900/30"
         >
           Proceed to Checkout <ArrowRight size={20} />
         </button>
      </div>
    </div>
  );
};

export default Cart;