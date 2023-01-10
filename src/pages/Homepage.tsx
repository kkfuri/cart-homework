import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import Rules from "../components/Rules";

import { useProducts } from "../context/products.context";
import { useCart } from "../context/cart.context";
import { useRules } from "../context/rules.context";

function Homepage() {
  const { products } = useProducts();
  const { rules } = useRules();
  const { addItemToCart } = useCart();

  return (
    <div className="max-w-5xl mx-auto lg:mr-[26rem] min-h-screen px-8 py-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl lg:text-3xl">Product list</h2>
          <Rules />
        </div>
        <Cart />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {Object.values(products).map((product) => (
          <ProductCard
            key={product.sku}
            {...product}
            rule={rules[product.sku]}
            onClickAddToCart={addItemToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Homepage;
