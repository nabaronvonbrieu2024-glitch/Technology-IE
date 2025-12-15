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
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden border-x border-gray-200 relative">
      {/* Desktop/Tablet Warning (Mocking Mobile View) */}
      <div className="hidden lg:block fixed left-4 top-4 w-64 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
        <p><strong>Mobile View Emulation</strong></p>
        <p>This app is designed mobile-first. The layout is constrained to a mobile viewport.</p>
      </div>

      {/* Top Header */}
      <header className="bg-white sticky top-0 z-30 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
           <h1 className="text-xl font-bold text-gray-800 tracking-tight">Herbolario Vida</h1>
        </div>
        <Link to="/cart" className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {itemCount}
            </span>
          )}
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {item.badge ? (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;