import { useCart } from "../context/cart.context";
import { useRules } from "../context/rules.context";
import type { Product } from "../utils/checkout";

type CartItemProps = {
  amount: number;
  onClickIncrease: (sku: string) => void;
  onClickDecrease: (sku: string) => void;
  product: Product;
};

function CartItem({
  amount,
  onClickIncrease,
  onClickDecrease,
  product,
}: CartItemProps) {
  const { rules } = useRules();
  const { calculateCartItemPrice } = useCart();
  const price = calculateCartItemPrice(product, amount);
  const hasDiscount =
    rules[product.sku] && amount >= rules[product.sku].quantity;

  console.log(rules[product.sku]);

  return (
    <li
      className="space-x-4 flex"
      key={product.sku}
      aria-label={`${amount} ${product.name}`}
    >
      <div className="flex-1">
        <div className="inline-flex space-x-1 items-center mr-2 flex-1">
          <button
            className="px-1 py-.5 rounded text-sm transition border border-gray-300 text-gray-700"
            onClick={() => onClickIncrease(product.sku)}
            aria-label={`Increase ${product.name}`}
          >
            +
          </button>
          <span className="font-bold w-6 text-center">{amount}</span>
          <button
            className="px-1 py-.5 rounded text-sm transition border border-gray-300 text-gray-700"
            onClick={() => onClickDecrease(product.sku)}
            aria-label={`Decrease ${product.name}`}
          >
            -
          </button>
        </div>
        {product.name}
        {amount > 1 && "s"}
      </div>
      <div className="flex items-center">
        {hasDiscount && (
          <span className="line-through opacity-40 mr-2">
            ${product.price * amount}
          </span>
        )}
        <span className="font-bold text-lg">${price}</span>
      </div>
    </li>
  );
}

export default CartItem;
