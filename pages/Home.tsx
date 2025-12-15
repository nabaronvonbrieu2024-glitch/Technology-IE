import React from 'react';
import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { Search, Clock, Award, Leaf, ShieldCheck, HeartHandshake, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-10 pb-8">
      
      {/* Hero Section */}
      <div className="px-6 pt-2">
        <h1 className="text-[3rem] font-serif font-medium text-[#0F2A1D] leading-[1.1] tracking-tight mb-3">
          Nature,<br /> delivered.
        </h1>
        <p className="text-[#1C1C1C]/70 text-base font-light mb-8 max-w-[80%] leading-relaxed">
          Premium herbal remedies, curated and delivered within minutes.
        </p>

        {/* Search Bar - Minimalist */}
        <div className="relative shadow-[0_10px_40px_-10px_rgba(15,42,29,0.05)]">
          <input 
            type="text" 
            placeholder="Search herbs, teas, remedies..." 
            className="w-full h-14 bg-white rounded-2xl pl-12 pr-4 text-[#1C1C1C] placeholder:text-[#1C1C1C]/30 focus:outline-none focus:ring-1 focus:ring-[#0F2A1D]/20 transition-all text-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1C1C1C]/30" size={20} />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-6 border-b border-[#E5E0D8] pb-4">
           <h2 className="text-xl font-serif text-[#1C1C1C]">How it works</h2>
           <span className="text-xs font-medium text-[#C6A75E] tracking-widest uppercase">Simple</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#F7F5F2] border border-[#E5E0D8] flex items-center justify-center text-[#0F2A1D]">
              <Search size={20} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#0F2A1D]">Select</h3>
            <p className="text-[10px] text-[#1C1C1C]/60 leading-tight">Choose your specific wellness need.</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#F7F5F2] border border-[#E5E0D8] flex items-center justify-center text-[#0F2A1D]">
              <Award size={20} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#0F2A1D]">Curated</h3>
            <p className="text-[10px] text-[#1C1C1C]/60 leading-tight">Expertly vetted natural remedies.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#F7F5F2] border border-[#E5E0D8] flex items-center justify-center text-[#0F2A1D]">
              <Clock size={20} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#0F2A1D]">Delivered</h3>
            <p className="text-[10px] text-[#1C1C1C]/60 leading-tight">At your door in 30-40 minutes.</p>
          </div>
        </div>
      </div>

      {/* AI Assistant Promo - New Section */}
      <div className="px-6">
        <div className="bg-[#0F2A1D] rounded-3xl p-6 relative overflow-hidden shadow-xl shadow-green-900/20 group">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6A75E] opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-[#C6A75E]">
              <Sparkles size={20} />
            </div>
            
            <h3 className="text-xl font-serif text-[#F7F5F2] mb-2 leading-tight">Unsure what you need?</h3>
            <p className="text-stone-300 text-sm font-light mb-6 leading-relaxed max-w-[90%]">
              Describe your symptoms or wellness goals to Herbéra AI. Our assistant will guide you to the perfect remedy.
            </p>
            
            <Link 
              to="/wellness-ai" 
              className="inline-flex items-center gap-2 bg-[#F7F5F2] text-[#0F2A1D] px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Consult Assistant <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="px-6">
        <div className="mb-5">
          <h2 className="text-xl font-serif text-[#1C1C1C]">Explore Catalog</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/catalog?category=${cat.id}`}
              className="relative aspect-[4/5] rounded-[24px] overflow-hidden group shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              {/* Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A1D] via-[#0F2A1D]/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end h-full">
                <span className="text-[10px] text-[#C6A75E] font-bold tracking-widest uppercase mb-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  Collection
                </span>
                <h3 className="text-[#F7F5F2] font-serif text-lg leading-tight group-hover:-translate-y-1 transition-transform duration-500">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Brand Values Strip */}
      <div className="px-6 pt-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm">
           <h3 className="text-xs font-bold text-[#0F2A1D] uppercase tracking-widest mb-4 text-center">Our Promise</h3>
           
           <div className="grid grid-cols-2 gap-y-6 gap-x-2">
             <div className="flex items-start gap-3">
               <div className="text-[#C6A75E] mt-0.5">
                 <Leaf size={16} />
               </div>
               <div>
                 <p className="text-xs font-bold text-[#1C1C1C] mb-0.5">Subtle, not preachy</p>
                 <p className="text-[10px] text-[#1C1C1C]/50">Wellness on your terms.</p>
               </div>
             </div>

             <div className="flex items-start gap-3">
               <div className="text-[#C6A75E] mt-0.5">
                 <CheckCircle size={16} />
               </div>
               <div>
                 <p className="text-xs font-bold text-[#1C1C1C] mb-0.5">Sustainably sourced</p>
                 <p className="text-[10px] text-[#1C1C1C]/50">Earth-first harvesting.</p>
               </div>
             </div>

             <div className="flex items-start gap-3">
               <div className="text-[#C6A75E] mt-0.5">
                 <ShieldCheck size={16} />
               </div>
               <div>
                 <p className="text-xs font-bold text-[#1C1C1C] mb-0.5">No artificial additives</p>
                 <p className="text-[10px] text-[#1C1C1C]/50">100% pure ingredients.</p>
               </div>
             </div>

             <div className="flex items-start gap-3">
               <div className="text-[#C6A75E] mt-0.5">
                 <HeartHandshake size={16} />
               </div>
               <div>
                 <p className="text-xs font-bold text-[#1C1C1C] mb-0.5">Trusted suppliers</p>
                 <p className="text-[10px] text-[#1C1C1C]/50">Vetted artisan partners.</p>
               </div>
             </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Home;