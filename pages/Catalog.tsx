
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Search, X } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useProducts();
  const { t } = useI18n();
  
  const currentCategory = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = currentCategory ? product.category === currentCategory : true;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [currentCategory, searchTerm, products]);

  const handleCategoryClick = (catId: string | null) => {
    if (catId) setSearchParams({ category: catId });
    else setSearchParams({});
  };

  return (
    <div className="min-h-full bg-[#F7F5F2]">
      <div className="bg-white/80 backdrop-blur-md p-4 sticky top-0 z-20 shadow-sm border-b border-[#E5E0D8]">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder={t('home.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F7F5F2] text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none placeholder:text-[#1C1C1C]/40"
          />
          <Search className="absolute left-3 top-3 text-[#1C1C1C]/40" size={18} />
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 rounded-full text-xs font-medium border ${!currentCategory ? 'bg-[#0F2A1D] text-white' : 'bg-white'}`}
          >
            {t('cat.all')}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium border ${currentCategory === cat.id ? 'bg-[#0F2A1D] text-white' : 'bg-white'}`}
            >
              {t(`cat.${cat.id}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl text-[#0F2A1D]">
            {currentCategory ? t(`cat.${currentCategory}`) : t('cat.all')}
          </h2>
          <span className="text-xs text-[#1C1C1C]/40">{filteredProducts.length} results</span>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
