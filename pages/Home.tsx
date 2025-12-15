import React from 'react';
import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';

const Home: React.FC = () => {
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

      {/* Categories Grid */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Explore Categories</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/catalog?category=${cat.id}`}
              className="relative rounded-2xl overflow-hidden aspect-square group shadow-sm hover:shadow-md transition-shadow"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                 <span className="text-white font-bold text-lg leading-tight">{cat.name}</span>
              </div>
            </Link>
          ))}
          
          {/* View All Card to complete the grid */}
          <Link 
            to="/catalog"
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-100 text-gray-600 shadow-sm hover:shadow-md transition-shadow aspect-square"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
              <ArrowRight size={24} />
            </div>
            <span className="text-sm font-bold text-center">View All Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;