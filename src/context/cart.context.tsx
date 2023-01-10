import React, { useContext, useMemo, useState } from "react";
import {
  calculateCart,
  calculateItemPrice,
  type Product,
} from "../utils/checkout";
import { useRules } from "./rules.context";

interface ContextProps {
  children: React.ReactNode;
}

type CartContextType = {
  cart: string;
  addItemToCart: (sku: string) => void;
  removeItemFromCart: (sku: string) => void;
  calculateCartItemPrice: (product: Product, amount: number) => number;
  clearCart: () => void;
  cartCount: Record<string, number>;
};

export const CartContext = React.createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: ContextProps) => {
  const { rules } = useRules();
  const [cart, setCart] = useState("");

  function addItemToCart(sku: string) {
    setCart((value) => value.concat(sku));
  }

  function removeItemFromCart(sku: string) {
    setCart((value) => value.replace(sku, ""));
  }

  function clearCart() {
    setCart("");
  }

  function calculateCartItemPrice(product: Product, amount: number) {
    return calculateItemPrice(product, amount, rules);
  }

  const cartCount = useMemo(() => calculateCart(cart), [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        cartCount,
        calculateCartItemPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const hook = useContext(CartContext);
  if (!hook) {
    throw new Error("useCart must be inside a Provider with a value");
  }
  return hook;
};
