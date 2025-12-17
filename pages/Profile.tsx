
import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useI18n } from '../context/I18nContext';
import { Navigate, Link } from 'react-router-dom';
import { Package, MapPin, CreditCard, Settings, ChevronRight, LogOut, Heart } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { wishlistItems } = useWishlist();
  const { t } = useI18n();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-full bg-[#F7F5F2] pb-6">
      <div className="bg-white p-6 mb-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-[#E5E0D8]">
             <img src={user?.avatar} alt={user?.name} className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1C1C1C] font-serif">{user?.name}</h2>
            <p className="text-sm text-[#1C1C1C]/50">{user?.email}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#F7F5F2] text-[#C6A75E] border border-[#E5E0D8]">
              {isAdmin ? 'Store Manager' : 'Gold Member'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <Link to="/wishlist" className="flex items-center justify-center gap-2 p-3 bg-[#F7F5F2] rounded-xl text-sm font-medium text-[#1C1C1C] hover:bg-[#E5E0D8] transition-colors">
             <Heart size={18} className={wishlistItems.length > 0 ? "text-red-500 fill-red-500" : "text-[#C6A75E]"} /> {t('profile.wishlist')} ({wishlistItems.length})
           </Link>
           <button className="flex items-center justify-center gap-2 p-3 bg-[#F7F5F2] rounded-xl text-sm font-medium text-[#1C1C1C] hover:bg-[#E5E0D8] transition-colors">
             <Package size={18} className="text-[#0F2A1D]" /> {t('profile.orders')}
           </button>
        </div>
      </div>

      <div className="px-4 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D8] overflow-hidden">
          <h3 className="px-4 pt-4 pb-2 text-[10px] font-bold text-[#1C1C1C]/40 uppercase tracking-widest">{t('profile.account')}</h3>
          <div className="divide-y divide-[#F7F5F2]">
            <Link to="/profile/addresses" className="w-full flex items-center justify-between p-4 hover:bg-[#F7F5F2] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F5F2] text-[#0F2A1D] flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-medium text-[#1C1C1C]">{t('profile.addresses')}</span>
              </div>
              <ChevronRight size={16} className="text-[#1C1C1C]/20" />
            </Link>
            <Link to="/profile/payments" className="w-full flex items-center justify-between p-4 hover:bg-[#F7F5F2] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F5F2] text-[#0F2A1D] flex items-center justify-center">
                  <CreditCard size={18} />
                </div>
                <span className="text-sm font-medium text-[#1C1C1C]">{t('profile.payments')}</span>
              </div>
              <ChevronRight size={16} className="text-[#1C1C1C]/20" />
            </Link>
            <Link to="/profile/settings" className="w-full flex items-center justify-between p-4 hover:bg-[#F7F5F2] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F5F2] text-[#0F2A1D] flex items-center justify-center">
                  <Settings size={18} />
                </div>
                <span className="text-sm font-medium text-[#1C1C1C]">{t('profile.settings')}</span>
              </div>
              <ChevronRight size={16} className="text-[#1C1C1C]/20" />
            </Link>
          </div>
        </div>

        <button 
          onClick={logout}
          className="w-full p-4 bg-white rounded-2xl shadow-sm border border-[#E5E0D8] text-red-500 font-medium flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} /> {t('profile.logout')}
        </button>

        <p className="text-center text-xs text-[#1C1C1C]/30 pt-4 font-serif">Herbéra v1.0.1</p>
      </div>
    </div>
  );
};

export default Profile;
