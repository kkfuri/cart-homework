import { type Product } from "../utils/checkout";

type ProductCardProps = {
  onClickAddToCart: (sku: string) => void;
} & Product;

function ProductCard({ name, price, sku, onClickAddToCart }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center justify-center shadow-sm border rounded-sm py-4 px-2 bg-blue-200 border-blue-300">
      <div className="mb-2 text-center">
        <div className="flex space-x-2 items-center">
          <h3 className="font-bold text-lg md:text-2xl">{name}</h3>
          <span className="text-sm text-gray-500">#{sku}</span>
        </div>
        <h4 className="font-bold text-xl">${price}</h4>
      </div>
      <button
        className="rounded px-2 py-1 bg-green-700 hover:bg-green-500 transition text-white"
        onClick={() => onClickAddToCart(sku)}
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
