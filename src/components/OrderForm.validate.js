/**
 * Validation logic for the order form, kept separate from the
 * OrderForm component so it can be unit tested in isolation without
 * needing to render any JSX or simulate DOM events.
 *
 * validateOrder(values) returns an errors object where each key is
 * a field name and each value is a human-readable error message.
 * A field with no error is simply absent from the returned object,
 * so `Object.keys(errors).length === 0` means the form is valid.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function todayISODate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function validateOrder(values) {
  const errors = {};

  if (!values.customerName || !values.customerName.trim()) {
    errors.customerName = "Please enter your name.";
  } else if (values.customerName.trim().length < 2) {
    errors.customerName = "Name must be at least 2 characters.";
  }

  if (!values.email || !values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.productId) {
    errors.productId = "Please choose a product.";
  }

  const quantityNum = Number(values.quantity);
  if (values.quantity === "" || values.quantity === null || values.quantity === undefined) {
    errors.quantity = "Please enter a quantity.";
  } else if (!Number.isFinite(quantityNum) || !Number.isInteger(quantityNum)) {
    errors.quantity = "Quantity must be a whole number.";
  } else if (quantityNum < 1) {
    errors.quantity = "Quantity must be at least 1.";
  } else if (quantityNum > 100) {
    errors.quantity = "Quantity cannot exceed 100 per order.";
  }

  if (!values.deliveryAddress || !values.deliveryAddress.trim()) {
    errors.deliveryAddress = "Please enter a delivery address.";
  } else if (values.deliveryAddress.trim().length < 8) {
    errors.deliveryAddress = "Please enter a complete delivery address.";
  }

  if (!values.deliveryDate) {
    errors.deliveryDate = "Please choose a delivery date.";
  } else if (values.deliveryDate < todayISODate()) {
    errors.deliveryDate = "Delivery date cannot be in the past.";
  }

  if (!values.deliveryTime) {
    errors.deliveryTime = "Please choose a delivery time.";
  }

  return errors;
}

export default validateOrder;