import React, { useContext, useState } from "react";

import { DEFAULT_PRODUCTS } from "../utils/checkout/constants";
import { type Product } from "../utils/checkout";

interface ContextProps {
  children: React.ReactNode;
}

type ProductsContextType = {
  products: Record<string, Product>;
};

export const ProductsContext = React.createContext<
  ProductsContextType | undefined
>(undefined);

export const ProductsProvider = ({ children }: ContextProps) => {
  const [products] = useState(DEFAULT_PRODUCTS);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const hook = useContext(ProductsContext);
  if (!hook) {
    throw new Error("useProducts must be inside a Provider with a value");
  }
  return hook;
};
