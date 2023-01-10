import { type Product, CustomRule } from "../utils/checkout";

type ProductCardProps = {
  onClickAddToCart: (sku: string) => void;
  rule?: CustomRule;
} & Product;

function ProductCard({
  name,
  price,
  sku,
  rule,
  onClickAddToCart,
}: ProductCardProps) {
  return (
    <div className="flex flex-col items-center justify-center shadow-sm border rounded-sm py-4 px-2 bg-blue-200 border-blue-300">
      <div className="mb-2 text-center">
        <div className="flex space-x-2 items-center justify-center">
          <h3 className="font-bold text-lg md:text-2xl">{name}</h3>
          <span className="text-sm text-gray-500">#{sku}</span>
        </div>
        <div className="flex lg:space-x-2 items-center justify-center lg:flex-row flex-col">
          <h4 className="text-xl">${price}</h4>
          {rule && (
            <h5 className="font-bold text-green-600 px-1 py-0.5 border border-green-500 bg-green-200 rounded-sm">
              {rule?.quantity} for ${rule?.price}
            </h5>
          )}
        </div>
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
