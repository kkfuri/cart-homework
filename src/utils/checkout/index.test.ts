import { checkout } from "./index";

const carts = [
  { cart: "", expected: 0 },
  { cart: "A", expected: 50 },
  { cart: "AB", expected: 80 },
  { cart: "CDBA", expected: 115 },
  { cart: "AA", expected: 100 },
  { cart: "AAA", expected: 130 },
  { cart: "AAAA", expected: 180 },
  { cart: "AAAAA", expected: 230 },
  { cart: "AAAAAA", expected: 260 },
  { cart: "AAAB", expected: 160 },
  { cart: "AAABB", expected: 175 },
  { cart: "AAABBD", expected: 190 },
  { cart: "DABABA", expected: 190 },
  { cart: "DABABA", expected: 190 },
];

describe("checkout", () => {
  test.each(carts)(
    'The cart: "$cart" has the price of $expected',
    ({ cart, expected }) => {
      expect(checkout({ cart })).toBe(expected);
    }
  );

  test("An undefined product is ignored in the final value", () => {
    expect(checkout({ cart: "1234567A" })).toBe(50);
  });

  test("It is possible to have custom product database", () => {
    const productDatabase = {
      G: { sku: "G", price: 30, name: "Grape" },
      Y: { sku: "Y", price: 30, name: "Yam" },
    };
    expect(checkout({ cart: "GY", products: productDatabase })).toBe(60);
  });

  test("It is possible to have custom rules database", () => {
    const rulesDatabase = [
      { product: "A", quantity: 2, price: 80 },
      { product: "D", quantity: 5, price: 60 },
    ];
    expect(checkout({ cart: "AADDDDD", rules: rulesDatabase })).toBe(140);
  });
});
