import React, { useState, Fragment } from "react";

import { checkout } from "../utils/checkout";

import CartItem from "./CartItem";

import { useCart } from "../context/cart.context";
import { useMarket } from "../context/market.context";

function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { products, rules } = useMarket();
  const { cart, addItemToCart, cartCount, clearCart, removeItemFromCart } =
    useCart();

  if (!cart) return <></>;

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="rounded border border-gray-400 bg-gray-200 px-2 py-1 lg:hidden flex items-center"
      >
        {isOpen ? "Close" : "Open"} cart
        <span className="text-gray-600 text-sm ml-1">
          ({cart.length} items)
        </span>
      </button>
      <div
        className={[
          "fixed bottom-0 lg:bottom-10 left-0 right-0 lg:right-10 lg:left-auto lg:block",
          isOpen ? "block" : "hidden",
        ].join(" ")}
      >
        <div className="relative w-full lg:w-96 py-8 px-6 rounded border border-gray-300 bg-gray-200 drop-shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl">Cart</h3>
            <button
              className="px-2 py-1 rounded border border-gray-500 bg-gray-300 hover:bg-gray-200 transition"
              onClick={clearCart}
            >
              Clear cart
            </button>
          </div>
          <ul className="space-y-2 max-h-[30vh] overflow-y-auto pr-4">
            {Object.entries(cartCount)
              .sort()
              .map(([sku, amount]) => {
                const product = products[sku as keyof typeof products];
                if (!product) return <Fragment key={sku} />;

                return (
                  <CartItem
                    key={sku}
                    product={product}
                    amount={amount}
                    onClickIncrease={addItemToCart}
                    onClickDecrease={removeItemFromCart}
                  />
                );
              })}
          </ul>
          <hr className="my-4 border-gray-500" />
          <div className="font-bold text-lg text-right mt-4 w-full pr-4">
            ${checkout({ cart, products, rules })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
