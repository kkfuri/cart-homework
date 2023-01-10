import ProductCard from "../components/ProductCard";

import { useProducts } from "../context/products.context";
import { useCart } from "../context/cart.context";
import Cart from "../components/Cart";

function Homepage() {
  const { products } = useProducts();
  const { addItemToCart } = useCart();

  return (
    <div className="bg-gray-300 min-h-screen px-8 py-12">
      <div className="max-w-5xl mx-auto lg:mr-[26rem]">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl">Product list</h2>
          <Cart />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {Object.values(products).map((product) => (
            <ProductCard
              key={product.sku}
              {...product}
              onClickAddToCart={addItemToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
