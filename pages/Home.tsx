import React from 'react';
import { CATEGORIES, PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-6 pb-6">
      {/* Hero Section */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-white/20 text-xs font-semibold px-2 py-1 rounded mb-3 inline-block">New Arrivals</span>
            <h2 className="text-2xl font-bold mb-2 leading-tight">Natural Healing <br/> for Modern Life</h2>
            <p className="text-green-100 text-sm mb-4 opacity-90">Discover our premium selection of organic teas and supplements.</p>
            <Link to="/catalog" className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition inline-block shadow-sm">
              Shop Now
            </Link>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Features Icons */}
      <div className="flex justify-between px-6 text-center">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <Leaf size={18} />
          </div>
          <span className="text-[10px] text-gray-600 font-medium">100% Natural</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <ShieldCheck size={18} />
          </div>
          <span className="text-[10px] text-gray-600 font-medium">Quality Check</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <Truck size={18} />
          </div>
          <span className="text-[10px] text-gray-600 font-medium">Fast Delivery</span>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Categories</h3>
          <Link to="/catalog" className="text-xs text-green-600 font-medium flex items-center">
            View All <ArrowRight size={12} className="ml-1" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/catalog?category=${cat.id}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 w-20"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${cat.color} shadow-sm`}>
                {/* Normally we'd render dynamic icons here, but simple text/initials for now or the constant color blocks is fine. 
                    Using the first letter as a placeholder since we can't dynamic import Lucide icons easily from string names in this strict environment without a map.
                */}
                <span className="text-xl font-bold opacity-80">{cat.name.charAt(0)}</span>
              </div>
              <span className="text-xs text-center font-medium text-gray-700 leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4">
        <h3 className="font-bold text-gray-800 mb-3">Popular Products</h3>
        <div className="grid grid-cols-2 gap-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;