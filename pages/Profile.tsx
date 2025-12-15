import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { User, Package, MapPin, CreditCard, Settings, ChevronRight, LogOut, Heart } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-full bg-gray-50 pb-6">
      {/* Profile Header */}
      <div className="bg-white p-6 mb-4 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-2xl font-bold">
            JD
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
            <p className="text-sm text-gray-500">john.doe@example.com</p>
            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Gold Member
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-100">
             <Heart size={18} className="text-red-500" /> Wishlist
           </button>
           <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-100">
             <Package size={18} className="text-blue-500" /> Orders
           </button>
        </div>
      </div>

      {/* Menu Options */}
      <div className="px-4 space-y-4">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="px-4 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Account</h3>
          
          <div className="divide-y divide-gray-50">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-medium text-gray-700">Saved Addresses</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <CreditCard size={18} />
                </div>
                <span className="text-sm font-medium text-gray-700">Payment Methods</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                  <Settings size={18} />
                </div>
                <span className="text-sm font-medium text-gray-700">Settings</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Recent Orders Preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
             <h3 className="font-bold text-gray-800 text-sm">Recent Orders</h3>
             <button className="text-xs text-green-600 font-medium">View All</button>
           </div>
           <div>
             {MOCK_ORDERS.slice(0, 2).map(order => (
               <div key={order.id} className="p-4 border-b border-gray-50 last:border-0 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm text-gray-800">{order.id}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.date} • {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-gray-900">${order.total.toFixed(2)}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
               </div>
             ))}
           </div>
        </div>

        <button className="w-full p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-red-500 font-medium flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
          <LogOut size={18} /> Log Out
        </button>

        <p className="text-center text-xs text-gray-400 pt-4">Herbolario Vida v1.0.0</p>
      </div>
    </div>
  );
};

export default Profile;