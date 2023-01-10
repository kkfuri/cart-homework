import { useState } from "react";
import { useProducts } from "../context/products.context";
import { useRules } from "../context/rules.context";

function Rules() {
  const { rules, removeRule } = useRules();
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded border border-gray-400 bg-gray-200 px-2 py-1 flex items-center"
      >
        Rules settings
      </button>
      {isOpen && (
        <div className="min-h-screen min-w-screen bg-white absolute inset-0 z-10">
          <div className="max-w-5xl mx-auto py-12 px-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl lg:text-3xl">Rules</h3>
              <button
                className="rounded border border-gray-400 bg-gray-200 px-2 py-1 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="my-4">
              <h5 className="text-lg font-bold mb-2">Create new rule</h5>
              <form className="flex space-x-4">
                <select
                  name="sku"
                  className="border border-gray-200 p-2 text-sm rounded"
                >
                  {Object.entries(products)
                    .filter(([sku]) => !rules[sku])
                    .map(([sku, product]) => (
                      <option value={sku}>{product.name}</option>
                    ))}
                </select>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="quantity"
                  placeholder="Quantity"
                  className="border border-gray-200 p-2 text-sm rounded"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="price"
                  placeholder="Price"
                  className="border border-gray-200 p-2 text-sm rounded"
                />
                <button type="submit">Create!</button>
              </form>
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-3 h-full gap-4">
              {Object.entries(rules).map(([sku, rule]) => (
                <li
                  className="p-4 flex items-center justify-between rounded border border-gray-300"
                  key={sku}
                >
                  <span>
                    {products[sku].name}: {rule.quantity} for ${rule.price}
                  </span>
                  <button
                    className="text-red-500 px-1 py-0.5 text-sm border border-red-500 rounded-sm hover:bg-red-100/50 transition"
                    onClick={() => removeRule(sku)}
                  >
                    Delete rule
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Rules;
