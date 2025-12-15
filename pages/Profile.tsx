import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Package, MapPin, CreditCard, Settings, ChevronRight, LogOut, Heart } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-full bg-[#F7F5F2] pb-6">
      {/* Profile Header */}
      <div className="bg-white p-6 mb-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-[#E5E0D8]">
             <img src={user?.avatar} alt={user?.name} className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1C1C1C] font-serif">{user?.name}</h2>
            <p className="text-sm text-[#1C1C1C]/50">{user?.email}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#F7F5F2] text-[#C6A75E] border border-[#E5E0D8]">
              Gold Member
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <button className="flex items-center justify-center gap-2 p-3 bg-[#F7F5F2] rounded-xl text-sm font-medium text-[#1C1C1C] hover:bg-[#E5E0D8] transition-colors">
             <Heart size={18} className="text-[#C6A75E]" /> Wishlist
           </button>
           <button className="flex items-center justify-center gap-2 p-3 bg-[#F7F5F2] rounded-xl text-sm font-medium text-[#1C1C1C] hover:bg-[#E5E0D8] transition-colors">
             <Package size={18} className="text-[#0F2A1D]" /> Orders
           </button>
        </div>
      </div>

      {/* Menu Options */}
      <div className="px-4 space-y-4">
        
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D8] overflow-hidden">
          <h3 className="px-4 pt-4 pb-2 text-[10px] font-bold text-[#1C1C1C]/40 uppercase tracking-widest">Account</h3>
          
          <div className="divide-y divide-[#F7F5F2]">
            <button className="w-full flex items-center justify-between p-4 hover:bg-[#F7F5F2] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F5F2] text-[#0F2A1D] flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-medium text-[#1C1C1C]">Saved Addresses</span>
              </div>
              <ChevronRight size={16} className="text-[#1C1C1C]/20" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-[#F7F5F2] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F5F2] text-[#0F2A1D] flex items-center justify-center">
                  <CreditCard size={18} />
                </div>
                <span className="text-sm font-medium text-[#1C1C1C]">Payment Methods</span>
              </div>
              <ChevronRight size={16} className="text-[#1C1C1C]/20" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-[#F7F5F2] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F5F2] text-[#0F2A1D] flex items-center justify-center">
                  <Settings size={18} />
                </div>
                <span className="text-sm font-medium text-[#1C1C1C]">Settings</span>
              </div>
              <ChevronRight size={16} className="text-[#1C1C1C]/20" />
            </button>
          </div>
        </div>

        {/* Recent Orders Preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D8] overflow-hidden">
           <div className="px-4 py-3 border-b border-[#F7F5F2] flex justify-between items-center">
             <h3 className="font-bold text-[#1C1C1C] text-sm font-serif">Recent Orders</h3>
             <button className="text-xs text-[#C6A75E] font-medium hover:text-[#0F2A1D] transition-colors">View All</button>
           </div>
           <div>
             {MOCK_ORDERS.slice(0, 2).map(order => (
               <div key={order.id} className="p-4 border-b border-[#F7F5F2] last:border-0 flex justify-between items-center hover:bg-[#F7F5F2] transition-colors cursor-pointer">
                  <div>
                    <p className="font-medium text-sm text-[#1C1C1C]">{order.id}</p>
                    <p className="text-xs text-[#1C1C1C]/50 mt-0.5">{order.date} • {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-[#1C1C1C]">${order.total.toFixed(2)}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      order.status === 'Delivered' ? 'bg-[#9DB8A0]/20 text-[#0F2A1D]' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
               </div>
             ))}
           </div>
        </div>

        <button 
          onClick={logout}
          className="w-full p-4 bg-white rounded-2xl shadow-sm border border-[#E5E0D8] text-red-500 font-medium flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} /> Log Out
        </button>

        <p className="text-center text-xs text-[#1C1C1C]/30 pt-4 font-serif">Herbéra v1.0.0</p>
      </div>
    </div>
  );
};

export default Profile;