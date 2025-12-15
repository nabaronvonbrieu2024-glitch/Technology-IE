import React from 'react';
import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section */}
      <div className="px-4 pt-2">
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-green-900/20 aspect-[4/3] group">
          <img 
            src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop" 
            alt="Wellness Lifestyle" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 text-white w-full">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium tracking-wide mb-4 border border-white/30">
              New Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 leading-tight">
              Nature's Finest <br/> <span className="italic font-light">Remedies</span>
            </h2>
            <p className="text-stone-200 text-sm mb-6 max-w-[250px] font-light leading-relaxed">
              Curated organic teas and supplements for your daily wellness ritual.
            </p>
            <Link to="/catalog" className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-full text-sm font-bold hover:bg-stone-100 transition-colors shadow-lg shadow-black/10">
              Shop Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="px-6">
        <div className="flex justify-between py-6 border-y border-stone-200">
          <div className="flex flex-col items-center gap-2 text-center group">
            <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <Leaf size={20} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-stone-600 font-bold tracking-wide uppercase mt-1">100% Organic</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center group">
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <ShieldCheck size={20} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-stone-600 font-bold tracking-wide uppercase mt-1">Lab Tested</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center group">
            <div className="w-12 h-12 bg-orange-50 text-orange-700 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <Truck size={20} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-stone-600 font-bold tracking-wide uppercase mt-1">Express Ship</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-4">
        <div className="flex items-end justify-between mb-6 px-1">
          <div>
            <h3 className="text-2xl font-serif font-bold text-stone-900">Curated Categories</h3>
            <p className="text-xs text-stone-500 mt-1">Browse by your wellness needs</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/catalog?category=${cat.id}`}
              className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <span className="text-white font-serif font-bold text-xl leading-none block mb-1">{cat.name.split(' ')[0]}</span>
                <span className="text-white/80 font-serif italic text-lg leading-none block">{cat.name.split(' ').slice(1).join(' ')}</span>
                <div className="h-0.5 w-8 bg-white/50 mt-3 group-hover:w-16 transition-all duration-300"></div>
              </div>
            </Link>
          ))}
          
          {/* View All Card */}
          <Link 
            to="/catalog"
            className="flex flex-col items-center justify-center p-6 rounded-[1.5rem] bg-stone-100 text-stone-500 shadow-inner hover:bg-stone-200 transition-colors aspect-[4/5] group border border-stone-200"
          >
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
              <ArrowRight size={24} className="text-stone-800" />
            </div>
            <span className="text-sm font-bold text-stone-800">View All</span>
            <span className="text-xs text-stone-500 font-serif italic">Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;