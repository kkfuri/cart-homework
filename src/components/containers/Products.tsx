import { useState } from "react";
import { useProducts } from "../../context/products.context";

function Rules() {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);

    const name = String(data.get("name"));
    const price = Number(data.get("price"));

    if (!name || !price) return;

    console.log(name, { price });

    (e.target as HTMLFormElement).reset();
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded border border-gray-400 bg-gray-200 px-2 py-1 flex items-center"
      >
        Products management
      </button>
      {isOpen && (
        <div className="min-h-screen min-w-screen bg-white absolute inset-0 z-10">
          <div className="max-w-5xl mx-auto py-12 px-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl lg:text-3xl">Products</h3>
              <button
                className="rounded border border-gray-400 bg-gray-200 px-2 py-1 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="my-4">
              <h5 className="text-lg font-bold mb-2">Create new product</h5>
              <form
                className="flex space-y-2 lg:space-y-0 lg:space-x-4 lg:items-center lg:flex-row flex-col "
                onSubmit={handleFormSubmit}
                autoComplete="off"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name (example: Apple)"
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
            <ul className="grid grid-cols-2 lg:grid-cols-3 h-full gap-4">
              {Object.entries(products).map(([sku, product]) => (
                <li
                  className="p-4 flex items-center justify-between rounded border border-gray-300"
                  key={sku}
                >
                  <span>
                    {product.name} <strong>@</strong> ${product.price}
                  </span>
                  <button
                    className="text-red-500 px-1 py-0.5 text-sm border border-red-500 rounded-sm hover:bg-red-100/50 transition"
                    onClick={() => console.log(sku)}
                  >
                    Remove
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
