import { CartProvider } from "./context/cart.context";
import { ProductsProvider } from "./context/products.context";
import { RulesProvider } from "./context/rules.context";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <ProductsProvider>
      <RulesProvider>
        <CartProvider>
          <Homepage />
        </CartProvider>
      </RulesProvider>
    </ProductsProvider>
  );
}

export default App;
