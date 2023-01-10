import { useState } from "react";
import { useProducts } from "../context/products.context";
import { useRules } from "../context/rules.context";

function Rules() {
  const { rules, removeRule, createRule } = useRules();
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);

    const sku = String(data.get("sku"));
    const price = Number(data.get("price"));
    const quantity = Number(data.get("quantity"));

    if (!sku || !price || !quantity) return;

    createRule(sku, { price, quantity });

    (e.target as HTMLFormElement).reset();
  }

  const productsWithoutRule = Object.entries(products).filter(
    ([sku]) => !rules[sku]
  );

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
            {productsWithoutRule.length > 0 && (
              <div className="my-4">
                <h5 className="text-lg font-bold mb-2">Create new rule</h5>
                <form
                  className="flex space-y-2 lg:space-y-0 lg:space-x-4 lg:items-center lg:flex-row flex-col "
                  onSubmit={handleFormSubmit}
                  autoComplete="off"
                >
                  <select
                    name="sku"
                    className="border border-gray-200 p-2 text-sm rounded pr-6"
                  >
                    {productsWithoutRule.map(([sku, product]) => (
                      <option value={sku}>{product.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="quantity"
                    placeholder="Quantity (example: 4)"
                    className="border border-gray-200 p-2 text-sm rounded"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9.]*"
                    name="price"
                    placeholder="Price (example: 100)"
                    className="border border-gray-200 p-2 text-sm rounded"
                  />
                  <button
                    className="border rounded text-blue-600 border-blue-400 hover:border-blue-500 transition px-2 py-.5"
                    type="submit"
                  >
                    Create!
                  </button>
                </form>
              </div>
            )}
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
