import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

interface ProductContextType {
  products: Product[];
  updateProductImage: (productId: string, newImageUrl: string) => void;
  resetAllImages: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('herbera_product_overrides');
    if (saved) {
      try {
        const overrides = JSON.parse(saved);
        // Map initial products, but only apply override if it's a non-empty string.
        // This prevents the "invisible image" issue if a user previously saved a blank override.
        return INITIAL_PRODUCTS.map(p => {
          const override = overrides[p.id];
          if (override && typeof override === 'string' && override.trim().length > 0) {
            return { ...p, image: override };
          }
          return p;
        });
      } catch (e) {
        console.error("Error parsing product overrides:", e);
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const updateProductImage = (productId: string, newImageUrl: string) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === productId ? { ...p, image: newImageUrl } : p);
      const overrides = updated.reduce((acc, p) => {
        const initial = INITIAL_PRODUCTS.find(ip => ip.id === p.id);
        if (initial && initial.image !== p.image) {
          acc[p.id] = p.image;
        }
        return acc;
      }, {} as Record<string, string>);
      localStorage.setItem('herbera_product_overrides', JSON.stringify(overrides));
      return updated;
    });
  };

  const resetAllImages = () => {
    localStorage.removeItem('herbera_product_overrides');
    setProducts(INITIAL_PRODUCTS);
  };

  return (
    <ProductContext.Provider value={{ products, updateProductImage, resetAllImages }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};