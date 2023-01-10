import { DEFAULT_PRODUCTS, DEFAULT_RULES } from "./constants";

export type Product = { sku: string; price: number; name: string };
export type CustomRule = { quantity: number; price: number };

type CheckoutInputs = {
  cart: string;
  products?: Record<Product["sku"], Product>;
  rules?: Record<Product["sku"], CustomRule>;
};

export function calculateCart(cart: string): Record<string, number> {
  const productsCount: Record<string, number> = {};

  cart
    .split("")
    .forEach((sku) => (productsCount[sku] = (productsCount[sku] || 0) + 1));

  return productsCount;
}

export function calculateItemPrice(
  product: Product,
  amount: number,
  rules: Record<Product["sku"], CustomRule>
): number {
  const customRule =
    amount >= rules[product.sku]?.quantity && rules[product.sku];

  let price = 0;

  if (customRule) {
    const quantityThatFitsPromotion = Math.floor(amount / customRule.quantity);
    const rest = Math.floor(amount % customRule.quantity);

    price +=
      quantityThatFitsPromotion * customRule.price + rest * product.price;
  } else {
    price += amount * product.price;
  }

  return price;
}

export function checkout({
  cart,
  products = DEFAULT_PRODUCTS,
  rules = DEFAULT_RULES,
}: CheckoutInputs): number {
  const productsCount = calculateCart(cart);

  let total = 0;

  Object.entries(productsCount).forEach(([sku, productQuantity]) => {
    const product = products[sku as keyof typeof products];
    if (!product) return;

    total += calculateItemPrice(product, productQuantity, rules);
  });

  return total;
}
