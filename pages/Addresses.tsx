
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Plus, Trash2, Check } from 'lucide-react';
import { Address } from '../types';
import { useToast } from '../context/ToastContext';

const Addresses: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newAddr, setNewAddr] = useState({
    label: '',
    street: '',
    city: '',
    postalCode: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('herbera_addresses');
    if (saved) setAddresses(JSON.parse(saved));
  }, []);

  const saveToLocal = (updated: Address[]) => {
    setAddresses(updated);
    localStorage.setItem('herbera_addresses', JSON.stringify(updated));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const addr: Address = {
      ...newAddr,
      id: Date.now().toString(),
      isDefault: addresses.length === 0
    };
    saveToLocal([...addresses, addr]);
    setNewAddr({ label: '', street: '', city: '', postalCode: '' });
    setIsAdding(false);
    showToast('Address saved successfully');
  };

  const removeAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id);
    saveToLocal(updated);
    showToast('Address removed', 'info');
  };

  const setDefault = (id: string) => {
    const updated = addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    saveToLocal(updated);
  };

  return (
    <div className="min-h-full bg-[#F7F5F2] pb-24">
      <div className="bg-white p-6 sticky top-0 z-10 border-b border-[#E5E0D8] flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-[#1C1C1C]">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-serif font-bold text-[#0F2A1D]">Saved Addresses</h1>
      </div>

      <div className="p-4 space-y-4">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white rounded-2xl p-5 border border-[#E5E0D8] shadow-sm relative group">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#0F2A1D]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] flex items-center gap-2">
                    {addr.label}
                    {addr.isDefault && <span className="text-[9px] bg-[#0F2A1D] text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">Default</span>}
                  </h3>
                  <p className="text-sm text-[#1C1C1C]/60 mt-1">{addr.street}</p>
                  <p className="text-sm text-[#1C1C1C]/60">{addr.city}, {addr.postalCode}</p>
                </div>
              </div>
              <button onClick={() => removeAddress(addr.id)} className="text-[#1C1C1C]/20 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
            {!addr.isDefault && (
              <button 
                onClick={() => setDefault(addr.id)}
                className="mt-4 text-xs font-bold text-[#C6A75E] uppercase tracking-widest flex items-center gap-1"
              >
                Set as default
              </button>
            )}
          </div>
        ))}

        {isAdding ? (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 border border-[#0F2A1D]/20 shadow-xl space-y-4 animate-[slideIn_0.3s_ease-out]">
            <h2 className="font-serif text-lg text-[#0F2A1D] mb-2">New Address</h2>
            <input 
              required
              placeholder="Label (e.g. Home, Office)"
              value={newAddr.label}
              onChange={e => setNewAddr({...newAddr, label: e.target.value})}
              className="w-full bg-[#F7F5F2] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F2A1D]"
            />
            <input 
              required
              placeholder="Street Address"
              value={newAddr.street}
              onChange={e => setNewAddr({...newAddr, street: e.target.value})}
              className="w-full bg-[#F7F5F2] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F2A1D]"
            />
            <div className="flex gap-3">
              <input 
                required
                placeholder="City"
                value={newAddr.city}
                onChange={e => setNewAddr({...newAddr, city: e.target.value})}
                className="flex-1 bg-[#F7F5F2] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F2A1D]"
              />
              <input 
                required
                placeholder="Postal Code"
                value={newAddr.postalCode}
                onChange={e => setNewAddr({...newAddr, postalCode: e.target.value})}
                className="w-28 bg-[#F7F5F2] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F2A1D]"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="flex-1 py-3 text-sm font-bold text-[#1C1C1C]/40 uppercase tracking-widest"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 bg-[#0F2A1D] text-white py-3 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-green-900/10"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full border-2 border-dashed border-[#E5E0D8] rounded-2xl p-6 flex flex-col items-center justify-center text-[#1C1C1C]/40 hover:text-[#0F2A1D] hover:border-[#0F2A1D]/30 transition-all"
          >
            <Plus size={24} className="mb-2" />
            <span className="text-xs font-bold uppercase tracking-widest">Add New Address</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Addresses;
