import { validateOrder, todayISODate } from "./OrderForm.validate";

const validValues = {
  customerName: "Aye Aye",
  email: "aye@example.com",
  productId: "jasmine-rice",
  quantity: "3",
  deliveryAddress: "123 Pansodan Street, Yangon",
  deliveryDate: todayISODate(),
  deliveryTime: "09:00-12:00",
};

describe("validateOrder", () => {
  test("returns no errors for a fully valid order", () => {
    const errors = validateOrder(validValues);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  test("requires a customer name", () => {
    const errors = validateOrder({ ...validValues, customerName: "" });
    expect(errors.customerName).toBeDefined();
  });

  test("rejects a customer name that is too short", () => {
    const errors = validateOrder({ ...validValues, customerName: "A" });
    expect(errors.customerName).toBeDefined();
  });

  test("requires a syntactically valid email address", () => {
    const errors = validateOrder({ ...validValues, email: "not-an-email" });
    expect(errors.email).toBeDefined();
  });

  test("accepts a valid email address", () => {
    const errors = validateOrder({ ...validValues, email: "shop@goldenland.example" });
    expect(errors.email).toBeUndefined();
  });

  test("requires a product to be selected", () => {
    const errors = validateOrder({ ...validValues, productId: "" });
    expect(errors.productId).toBeDefined();
  });

  test("rejects a missing quantity", () => {
    const errors = validateOrder({ ...validValues, quantity: "" });
    expect(errors.quantity).toBeDefined();
  });

  test("rejects a quantity of zero", () => {
    const errors = validateOrder({ ...validValues, quantity: "0" });
    expect(errors.quantity).toBeDefined();
  });

  test("rejects a non-integer quantity", () => {
    const errors = validateOrder({ ...validValues, quantity: "2.5" });
    expect(errors.quantity).toBeDefined();
  });

  test("rejects a quantity above the 100-unit cap", () => {
    const errors = validateOrder({ ...validValues, quantity: "101" });
    expect(errors.quantity).toBeDefined();
  });

  test("accepts a quantity at the upper boundary of 100", () => {
    const errors = validateOrder({ ...validValues, quantity: "100" });
    expect(errors.quantity).toBeUndefined();
  });

  test("requires a delivery address", () => {
    const errors = validateOrder({ ...validValues, deliveryAddress: "" });
    expect(errors.deliveryAddress).toBeDefined();
  });

  test("rejects a delivery address that is too short to be real", () => {
    const errors = validateOrder({ ...validValues, deliveryAddress: "abc" });
    expect(errors.deliveryAddress).toBeDefined();
  });

  test("requires a delivery date", () => {
    const errors = validateOrder({ ...validValues, deliveryDate: "" });
    expect(errors.deliveryDate).toBeDefined();
  });

  test("rejects a delivery date in the past", () => {
    const errors = validateOrder({ ...validValues, deliveryDate: "2020-01-01" });
    expect(errors.deliveryDate).toBeDefined();
  });

  test("accepts today's date as a valid delivery date", () => {
    const errors = validateOrder({ ...validValues, deliveryDate: todayISODate() });
    expect(errors.deliveryDate).toBeUndefined();
  });

  test("requires a delivery time", () => {
    const errors = validateOrder({ ...validValues, deliveryTime: "" });
    expect(errors.deliveryTime).toBeDefined();
  });
});