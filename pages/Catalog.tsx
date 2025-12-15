import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  const currentCategory = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = currentCategory ? product.category === currentCategory : true;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [currentCategory, searchTerm]);

  const handleCategoryClick = (catId: string | null) => {
    if (catId) {
      setSearchParams({ category: catId });
    } else {
      setSearchParams({});
    }
  };

  const getCategoryTitle = () => {
    if (currentCategory) {
      return CATEGORIES.find(c => c.id === currentCategory)?.name || 'All Products';
    }
    return 'All Products';
  }

  return (
    <div className="min-h-full bg-[#F7F5F2]">
      {/* Search Header */}
      <div className="bg-white/80 backdrop-blur-md p-4 sticky top-0 z-20 shadow-sm border-b border-[#E5E0D8]">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search natural products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F7F5F2] text-[#1C1C1C] text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#0F2A1D]/20 transition-all placeholder:text-[#1C1C1C]/40"
          />
          <Search className="absolute left-3 top-3 text-[#1C1C1C]/40" size={18} />
          {searchTerm && (
             <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3 text-[#1C1C1C]/40 hover:text-[#0F2A1D]">
               <X size={16} />
             </button>
          )}
        </div>
        
        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 border ${
              !currentCategory 
                ? 'bg-[#0F2A1D] text-[#F7F5F2] border-[#0F2A1D]' 
                : 'bg-white text-[#1C1C1C]/60 border-[#E5E0D8] hover:border-[#0F2A1D]'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 border ${
                currentCategory === cat.id
                  ? 'bg-[#0F2A1D] text-[#F7F5F2] border-[#0F2A1D]'
                  : 'bg-white text-[#1C1C1C]/60 border-[#E5E0D8] hover:border-[#0F2A1D]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="p-4 pb-10">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="font-serif text-xl text-[#0F2A1D]">{getCategoryTitle()}</h2>
          <span className="text-xs font-medium text-[#1C1C1C]/40">
            {filteredProducts.length} results
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-[#E5E0D8] rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-[#1C1C1C]/40" />
            </div>
            <h3 className="text-[#1C1C1C] font-serif font-medium mb-1">No products found</h3>
            <p className="text-[#1C1C1C]/50 text-sm max-w-[200px]">We couldn't find any products matching your criteria.</p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-[#0F2A1D] text-sm font-bold underline"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;