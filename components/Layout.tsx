import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, ShoppingBag, User, Search, Sparkles, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const { itemCount } = useCart();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/catalog', icon: Search, label: 'Shop' },
    { path: '/wellness-ai', icon: Sparkles, label: 'Ask AI' },
    { path: '/cart', icon: ShoppingBag, label: 'Cart', badge: itemCount },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden border-x border-stone-200 relative font-sans">
      {/* Desktop/Tablet Warning (Mocking Mobile View) */}
      <div className="hidden lg:block fixed left-4 top-4 w-64 p-4 bg-white/80 backdrop-blur border border-stone-200 rounded-xl text-sm text-stone-600 shadow-sm z-50">
        <p className="font-serif font-bold text-stone-800 mb-1">Mobile View Emulation</p>
        <p>Designed for mobile. The layout is constrained to provide the intended experience.</p>
      </div>

      {/* Top Header - Glassmorphism */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-stone-100">
        <Link to="/" className="flex items-center gap-2 group">
           <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg group-hover:bg-green-800 transition-colors">H</div>
           <h1 className="text-xl font-bold text-stone-900 tracking-tight font-serif group-hover:text-green-800 transition-colors">Herbolario Vida</h1>
        </Link>
        <Link to="/cart" className="relative p-2 text-stone-600 hover:text-green-800 transition-colors">
          <ShoppingCart size={22} strokeWidth={1.5} />
          {itemCount > 0 && (
            <span className="absolute top-1 right-0 bg-green-700 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm">
              {itemCount}
            </span>
          )}
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 pt-20 no-scrollbar bg-stone-50">
        <Outlet />
      </main>

      {/* Bottom Navigation - Glassmorphism */}
      <nav className="absolute bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-stone-100 pb-safe">
        <div className="flex justify-around items-center h-20 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300 group ${
                  isActive ? 'text-green-800' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <div className={`relative p-1.5 rounded-xl transition-all ${isActive ? 'bg-green-50' : 'bg-transparent'}`}>
                  <Icon size={24} strokeWidth={isActive ? 2 : 1.5} className="transition-transform group-hover:scale-110" />
                  {item.badge ? (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold min-w-[14px] h-[14px] px-0.5 flex items-center justify-center rounded-full ring-2 ring-white">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;