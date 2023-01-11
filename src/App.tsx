import { CartProvider } from "./context/cart.context";
import { MarketProvider } from "./context/market.context";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <MarketProvider>
      <CartProvider>
        <Homepage />
      </CartProvider>
    </MarketProvider>
  );
}

export default App;
