import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const deliveryFee = cartTotal > 50 ? 0 : 5.99;
  const finalTotal = cartTotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <div className="text-green-300">
             {/* Shopping bag illustration placeholder */}
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-xs">Looks like you haven't added any natural goodies to your cart yet.</p>
        <Link to="/catalog" className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-full pb-32">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Cart <span className="text-sm font-normal text-gray-500 ml-2">({items.length} items)</span></h1>

      {/* Cart Items List */}
      <div className="space-y-4 mb-8">
        {items.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm flex gap-3 border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{item.category}</p>
              </div>
              
              <div className="flex justify-between items-end">
                <span className="font-bold text-green-700">${item.price.toFixed(2)}</span>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-50 rounded-lg h-7 px-1 border border-gray-200">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-full flex items-center justify-center text-gray-600 hover:text-green-600"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-gray-800">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-full flex items-center justify-center text-gray-600 hover:text-green-600"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <h3 className="font-bold text-gray-800 mb-2">Order Summary</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery</span>
          <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
            {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
          </span>
        </div>
        <div className="border-t border-dashed border-gray-200 my-2 pt-2 flex justify-between items-center">
          <span className="font-bold text-gray-800">Total</span>
          <span className="font-bold text-xl text-green-700">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-200 shadow-lg">
         <button 
            onClick={() => alert("Checkout flow would open here!")}
            className="w-full bg-gray-900 text-white h-14 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
         >
           Proceed to Checkout <ArrowRight size={20} />
         </button>
      </div>
    </div>
  );
};

export default Cart;