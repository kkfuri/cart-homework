import React, { useContext, useState } from "react";

import { DEFAULT_PRODUCTS, DEFAULT_RULES } from "../utils/checkout/constants";
import { type CustomRule, type Product, type Sku } from "../utils/checkout";

interface ContextProps {
  children: React.ReactNode;
}

type MarketContextType = {
  products: Record<Sku, Product>;
  createProduct: (sku: Sku, product: Product) => void;
  removeProduct: (sku: Sku) => void;
  rules: Record<Sku, CustomRule>;
  createRule: (sku: Sku, rule: CustomRule) => void;
  removeRule: (sku: Sku) => void;
};

export const MarketContext = React.createContext<MarketContextType | undefined>(
  undefined
);

export const MarketProvider = ({ children }: ContextProps) => {
  const [products, setProducts] =
    useState<Record<Sku, Product>>(DEFAULT_PRODUCTS);
  const [rules, setRules] = useState<Record<Sku, CustomRule>>(DEFAULT_RULES);

  function createRule(sku: Sku, rule: CustomRule) {
    setRules((v) => ({ ...v, [sku]: rule }));
  }

  function removeRule(sku: Sku) {
    setRules((v) => {
      const copy = { ...v };
      delete copy[sku];
      return copy;
    });
  }

  function createProduct(sku: Sku, product: Product) {
    setProducts((v) => ({ ...v, [sku]: product }));
  }

  function removeProduct(sku: Sku) {
    removeRule(sku);
    setProducts((v) => {
      const copy = { ...v };
      delete copy[sku];
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
