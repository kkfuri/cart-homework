import { DEFAULT_PRODUCTS, DEFAULT_RULES } from "./constants";

type Product = { sku: string; price: number; name: string };
type CustomRule = { product: string; quantity: number; price: number };

type CheckoutInputs = {
  cart: string;
  products?: Record<Product["sku"], Product>;
  rules?: CustomRule[];
};

export function checkout({
  cart,
  products = DEFAULT_PRODUCTS,
  rules = DEFAULT_RULES,
}: CheckoutInputs): number {
  const productsCount: Record<string, number> = {};

  cart
    .split("")
    .forEach((sku) => (productsCount[sku] = (productsCount[sku] || 0) + 1));

  let total = 0;

  Object.entries(productsCount).forEach(([sku, productQuantity]) => {
    const product = products[sku as keyof typeof products];
    if (!product) return;

    const customRule = rules.find(
      (rule) => rule.product === sku && productQuantity >= rule.quantity
    );

    if (customRule) {
      const quantityThatFitsPromotion = Math.floor(
        productQuantity / customRule.quantity
      );
      const rest = Math.floor(productQuantity % customRule.quantity);

      total +=
        quantityThatFitsPromotion * customRule.price + rest * product.price;
    } else {
      total += productQuantity * product.price;
    }
  });

  return total;
}
