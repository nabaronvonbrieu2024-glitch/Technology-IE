
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { PaymentMethod } from '../types';
import { useToast } from '../context/ToastContext';

const Payments: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const [newCard, setNewCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('herbera_payments');
    if (saved) setMethods(JSON.parse(saved));
  }, []);

  const saveToLocal = (updated: PaymentMethod[]) => {
    setMethods(updated);
    localStorage.setItem('herbera_payments', JSON.stringify(updated));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const method: PaymentMethod = {
      id: Date.now().toString(),
      cardholderName: newCard.name,
      lastFour: newCard.number.slice(-4),
      expiry: newCard.expiry,
      brand: newCard.number.startsWith('4') ? 'visa' : 'mastercard'
    };
    saveToLocal([...methods, method]);
    setNewCard({ name: '', number: '', expiry: '', cvv: '' });
    setIsAdding(false);
    showToast('Payment method added');
  };

  const removeMethod = (id: string) => {
    saveToLocal(methods.filter(m => m.id !== id));
    showToast('Payment method removed', 'info');
  };

  return (
    <div className="min-h-full bg-[#F7F5F2] pb-24">
      <div className="bg-white p-6 sticky top-0 z-10 border-b border-[#E5E0D8] flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-[#1C1C1C]">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-serif font-bold text-[#0F2A1D]">Payment Methods</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-[#0F2A1D] rounded-2xl p-4 text-white/60 text-[10px] flex items-center gap-2 mb-6">
          <ShieldCheck size={16} className="text-[#C6A75E]" />
          <p className="uppercase tracking-widest font-bold">Encrypted & Secure SSL Checkout</p>
        </div>

        {methods.map(card => (
          <div key={card.id} className="relative aspect-[1.6/1] w-full rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#1C1C1C] to-[#3D3D3D] p-6 text-white group">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <CreditCard size={24} />
              </div>
              <button 
                onClick={() => removeMethod(card.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-white/40 hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="mt-8">
              <p className="text-lg tracking-[0.25em] font-mono">•••• •••• •••• {card.lastFour}</p>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <p className="text-[8px] uppercase tracking-widest opacity-40 mb-1">Card Holder</p>
                <p className="text-sm font-medium uppercase">{card.cardholderName}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] uppercase tracking-widest opacity-40 mb-1">Expires</p>
                <p className="text-sm font-medium">{card.expiry}</p>
              </div>
            </div>
            <div className="absolute top-6 right-6 font-serif italic text-lg opacity-40">
              {card.brand.toUpperCase()}
            </div>
          </div>
        ))}

        {isAdding ? (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-xl space-y-4">
            <h2 className="font-serif text-lg text-[#0F2A1D] mb-2">Add New Card</h2>
            <div className="space-y-4">
              <input 
                required
                placeholder="Full Name on Card"
                value={newCard.name}
                onChange={e => setNewCard({...newCard, name: e.target.value})}
                className="w-full bg-[#F7F5F2] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F2A1D]"
              />
              <input 
                required
                placeholder="Card Number"
                maxLength={16}
                value={newCard.number}
                onChange={e => setNewCard({...newCard, number: e.target.value.replace(/\D/g, '')})}
                className="w-full bg-[#F7F5F2] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F2A1D]"
              />
              <div className="flex gap-3">
                <input 
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  value={newCard.expiry}
                  onChange={e => setNewCard({...newCard, expiry: e.target.value})}
                  className="flex-1 bg-[#F7F5F2] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F2A1D]"
                />
                <input 
                  required
                  placeholder="CVV"
                  maxLength={3}
                  value={newCard.cvv}
                  onChange={e => setNewCard({...newCard, cvv: e.target.value})}
                  className="w-24 bg-[#F7F5F2] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F2A1D]"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 text-sm font-bold text-[#1C1C1C]/40 uppercase tracking-widest">Cancel</button>
              <button type="submit" className="flex-1 bg-[#0F2A1D] text-white py-3 rounded-xl text-sm font-bold uppercase tracking-widest">Add Card</button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full border-2 border-dashed border-[#E5E0D8] rounded-2xl p-6 flex flex-col items-center justify-center text-[#1C1C1C]/40 hover:text-[#0F2A1D] hover:border-[#0F2A1D]/30 transition-all"
          >
            <Plus size={24} className="mb-2" />
            <span className="text-xs font-bold uppercase tracking-widest">Add Payment Method</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Payments;
