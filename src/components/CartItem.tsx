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
  return (
    <li className="space-x-4 flex" aria-label={`${amount} ${product.name}`}>
      <div className="flex-1">
        <div className="inline-flex space-x-1 items-center mr-2 flex-1">
          <button
            className="px-1 py-.5 rounded text-sm transition border border-gray-300 text-gray-700"
            onClick={() => onClickDecrease(product.sku)}
            aria-label={`Decrease ${product.name}`}
          >
            -
          </button>
          <span className="font-bold w-6 text-center">{amount}</span>
          <button
            className="px-1 py-.5 rounded text-sm transition border border-gray-300 text-gray-700"
            onClick={() => onClickIncrease(product.sku)}
            aria-label={`Increase ${product.name}`}
          >
            +
          </button>
        </div>
        {product.name}
        {amount > 1 && "s"}
      </div>
      <span className="font-bold text-lg">${product.price * amount}</span>
    </li>
  );
}

export default CartItem;
