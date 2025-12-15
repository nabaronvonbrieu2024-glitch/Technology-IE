import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, ShoppingBag, User, Search, Sparkles, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const { itemCount } = useCart();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/catalog', icon: Search, label: 'Search' },
    { path: '/wellness-ai', icon: Sparkles, label: 'Assistant' },
    { path: '/cart', icon: ShoppingBag, label: 'Cart', badge: itemCount },
    { path: '/profile', icon: User, label: 'Account' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden border-x border-[#E5E0D8] relative font-sans text-[#1C1C1C]">
      {/* Desktop/Tablet Warning */}
      <div className="hidden lg:block fixed left-4 top-4 w-64 p-4 bg-white/90 backdrop-blur border border-stone-200 rounded-xl text-sm text-stone-600 shadow-sm z-50 font-sans">
        <p className="font-serif font-bold text-[#0F2A1D] mb-1">Mobile View Emulation</p>
        <p>Designed for mobile. The layout is constrained to provide the intended experience.</p>
      </div>

      {/* Top Header - Minimalist Luxury */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 py-6 flex items-center justify-between bg-[#F7F5F2]/90 backdrop-blur-md transition-all">
        <Link to="/" className="flex items-center gap-3 group">
           {/* Custom Herbéra Radiant Star Logo */}
           <div className="text-[#0F2A1D]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:opacity-80 transition-opacity">
                <path d="M12 2C14.5 7.5 16.5 9.5 22 12C16.5 14.5 14.5 16.5 12 22C9.5 16.5 7.5 14.5 2 12C7.5 9.5 9.5 7.5 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="2" fill="currentColor" className="opacity-80"/>
              </svg>
           </div>
           <span className="font-serif font-bold text-xl text-[#0F2A1D] tracking-tight">Herbéra</span>
        </Link>
        <Link to="/cart" className="relative p-2 text-[#1C1C1C] hover:text-[#0F2A1D] transition-colors">
          <ShoppingCart size={22} strokeWidth={1.2} />
          {itemCount > 0 && (
            <span className="absolute top-1 right-0 bg-[#0F2A1D] text-[#F7F5F2] text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 pt-24 no-scrollbar bg-[#F7F5F2]">
        <Outlet />
      </main>

      {/* Bottom Navigation - Luxury Minimalist */}
      <nav className="absolute bottom-0 left-0 right-0 z-40 bg-[#F7F5F2]/95 backdrop-blur-xl border-t border-[#E5E0D8] pb-safe">
        <div className="flex justify-around items-center h-20 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center w-full h-full space-y-1 group"
              >
                <div className="relative p-1">
                  <Icon 
                    size={24} 
                    strokeWidth={1.5} 
                    className={`transition-colors duration-300 ${isActive ? 'text-[#0F2A1D]' : 'text-[#1C1C1C]/40'}`} 
                  />
                  {item.badge ? (
                    <span className="absolute -top-1 -right-1 bg-[#C6A75E] text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                {isActive && (
                   <span className="w-1 h-1 rounded-full bg-[#0F2A1D] mt-1"></span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;