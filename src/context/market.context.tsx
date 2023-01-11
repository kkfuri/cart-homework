import React, { useContext, useState } from "react";

import { DEFAULT_PRODUCTS, DEFAULT_RULES } from "../utils/checkout/constants";
import { CustomRule, type Product } from "../utils/checkout";

interface ContextProps {
  children: React.ReactNode;
}

type MarketContextType = {
  products: Record<string, Product>;
  createProduct: (sku: string, product: Omit<Product, "sku">) => void;
  removeProduct: (sku: string) => void;
  rules: Record<string, CustomRule>;
  createRule: (sku: string, rule: CustomRule) => void;
  removeRule: (sku: string) => void;
};

export const MarketContext = React.createContext<MarketContextType | undefined>(
  undefined
);

export const MarketProvider = ({ children }: ContextProps) => {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [rules, setRules] = useState(DEFAULT_RULES);

  function createRule(sku: string, rule: CustomRule) {
    setRules((v) => ({ ...v, [sku]: rule }));
  }

  function removeRule(sku: string) {
    setRules((v) => {
      const copy = { ...v };
      delete copy[sku as keyof typeof rules];
      return copy;
    });
  }

  function createProduct(sku: string, product: Omit<Product, "sku">) {
    setProducts((v) => ({ ...v, [sku]: { ...product, sku } }));
  }

  function removeProduct(sku: string) {
    removeRule(sku);
    setProducts((v) => {
      const copy = { ...v };
      delete copy[sku as keyof typeof products];
      return copy;
    });
  }

  return (
    <MarketContext.Provider
      value={{
        products,
        createProduct,
        removeProduct,
        rules,
        createRule,
        removeRule,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const hook = useContext(MarketContext);

  if (!hook) {
    throw new Error("useMarket must be inside a Provider with a value");
  }
  return hook;
};
