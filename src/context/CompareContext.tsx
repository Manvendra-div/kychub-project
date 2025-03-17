import React, { createContext, useContext, useState } from 'react';
import type { Product } from '../types/product';

interface CompareContextType {
  compareProducts: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);

  const addToCompare = (product: Product) => {
    if (compareProducts.length >= 4) return;
    if (compareProducts.some(p => p.id === product.id)) return;
    setCompareProducts([...compareProducts, product]);
  };

  const removeFromCompare = (productId: number) => {
    setCompareProducts(compareProducts.filter(p => p.id !== productId));
  };

  return (
    <CompareContext.Provider value={{ compareProducts, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompareProducts = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompareProducts must be used within a CompareProvider');
  }
  return context;
};