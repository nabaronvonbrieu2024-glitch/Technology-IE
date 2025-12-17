
import React from 'react';
import { useCart } from '../context/CartContext';
import { useI18n } from '../context/I18nContext';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { t } = useI18n();
  const deliveryFee = cartTotal > 50 ? 0 : 5.99;
  const finalTotal = cartTotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-stone-50">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
           <ShoppingBag size={40} className="text-stone-300" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">{t('cart.empty')}</h2>
        <Link to="/catalog" className="bg-stone-900 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-stone-50 min-h-full pb-40">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">{t('cart.title')}</h1>

      <div className="space-y-6 mb-10">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 bg-white p-4 rounded-3xl shadow-sm border border-stone-100">
            <div className="w-24 h-24 bg-stone-100 rounded-2xl overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-serif font-bold text-stone-900 text-base leading-tight mb-1">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-500 transition-colors p-1"><Trash2 size={16} /></button>
                </div>
                <p className="text-stone-500 text-xs font-medium uppercase tracking-wider">{t(`cat.${item.category}`)}</p>
              </div>
              <div className="flex justify-between items-end mt-3">
                <span className="font-serif font-bold text-lg text-stone-900">${item.price.toFixed(2)}</span>
                <div className="flex items-center bg-stone-50 rounded-full h-8 px-1 border border-stone-200">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 flex items-center justify-center"><Minus size={14} /></button>
                  <span className="w-6 text-center text-xs font-bold text-stone-900">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 flex items-center justify-center"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl border border-stone-100 space-y-4">
        <h3 className="font-serif font-bold text-stone-900 text-lg">{t('cart.summary')}</h3>
        <div className="flex justify-between text-sm text-stone-600">
          <span>{t('cart.subtotal')}</span>
          <span className="font-medium">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-stone-600">
          <span>{t('cart.delivery')}</span>
          <span className="font-medium">{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
        </div>
        <div className="border-t border-dashed border-stone-200 pt-4 mt-2 flex justify-between items-center">
          <span className="font-bold text-stone-900">{t('cart.total')}</span>
          <span className="font-serif font-bold text-2xl text-stone-900">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto p-4 z-30">
         <button onClick={() => alert("Success!")} className="w-full bg-stone-900 text-white h-14 rounded-full font-bold flex items-center justify-center gap-3">
           {t('cart.checkout')} <ArrowRight size={20} />
         </button>
      </div>
    </div>
  );
};

export default Cart;
