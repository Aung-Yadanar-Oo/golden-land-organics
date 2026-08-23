import { useState } from "react";
import products from "../data/products";
import { validateOrder, todayISODate } from "./OrderForm.validate";

const initialValues = {
  customerName: "",
  email: "",
  productId: "",
  quantity: "",
  deliveryAddress: "",
  deliveryDate: "",
  deliveryTime: "",
};

/**
 * OrderForm
 *
 * A controlled, validated order form for Golden Land Organics.
 * Each field is validated on blur (so a field marked invalid stays
 * invalid until corrected) and again on submit. Errors are surfaced
 * both visually and via aria-describedby / role="alert" so screen
 * reader users are told what's wrong and where.
 *
 * On successful submit, onOrderSubmit(values) is called with the
 * validated form values and the form resets. The parent page decides
 * what "submitting" actually does (in this project, it just shows a
 * confirmation — there is no backend), which keeps this component
 * reusable and easy to unit test without mocking network calls.
 */
function OrderForm({ onOrderSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (touched[name] || submitAttempted) {
      setErrors(validateOrder(nextValues));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateOrder(values));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const validationErrors = validateOrder(values);
    setErrors(validationErrors);

    const allFieldNames = Object.keys(initialValues);
    setTouched(
      allFieldNames.reduce((acc, name) => ({ ...acc, [name]: true }), {})
    );

    if (Object.keys(validationErrors).length === 0) {
      const selectedProduct = products.find((p) => p.id === values.productId);
      onOrderSubmit({ ...values, product: selectedProduct });

      setValues(initialValues);
      setErrors({});
      setTouched({});
      setSubmitAttempted(false);
    }
  };

  const fieldError = (name) =>
    (touched[name] || submitAttempted) && errors[name] ? errors[name] : null;

  const selectedProduct = products.find((p) => p.id === values.productId);

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label="Order form"
      className="order-form"
    >
      <div className="form-field">
        <label htmlFor="customerName">Full name</label>
        <input
          id="customerName"
          name="customerName"
          type="text"
          value={values.customerName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldError("customerName"))}
          aria-describedby={
            fieldError("customerName") ? "customerName-error" : undefined
          }
        />
        {fieldError("customerName") && (
          <p className="field-error" id="customerName-error" role="alert">
            {fieldError("customerName")}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldError("email"))}
          aria-describedby={fieldError("email") ? "email-error" : undefined}
        />
        {fieldError("email") && (
          <p className="field-error" id="email-error" role="alert">
            {fieldError("email")}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="productId">Product</label>
        <select
          id="productId"
          name="productId"
          value={values.productId}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldError("productId"))}
          aria-describedby={
            fieldError("productId") ? "productId-error" : undefined
          }
        >
          <option value="">Choose a product…</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} — ${product.price.toFixed(2)} / {product.unit}
            </option>
          ))}
        </select>
        {fieldError("productId") && (
          <p className="field-error" id="productId-error" role="alert">
            {fieldError("productId")}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="quantity">
          Quantity{selectedProduct ? ` (${selectedProduct.unit})` : ""}
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          max="100"
          step="1"
          value={values.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldError("quantity"))}
          aria-describedby={
            fieldError("quantity") ? "quantity-error" : undefined
          }
        />
        {fieldError("quantity") && (
          <p className="field-error" id="quantity-error" role="alert">
            {fieldError("quantity")}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="deliveryAddress">Delivery address</label>
        <textarea
          id="deliveryAddress"
          name="deliveryAddress"
          rows="3"
          value={values.deliveryAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldError("deliveryAddress"))}
          aria-describedby={
            fieldError("deliveryAddress") ? "deliveryAddress-error" : undefined
          }
        />
        {fieldError("deliveryAddress") && (
          <p className="field-error" id="deliveryAddress-error" role="alert">
            {fieldError("deliveryAddress")}
          </p>
        )}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="deliveryDate">Delivery date</label>
          <input
            id="deliveryDate"
            name="deliveryDate"
            type="date"
            min={todayISODate()}
            value={values.deliveryDate}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldError("deliveryDate"))}
            aria-describedby={
              fieldError("deliveryDate") ? "deliveryDate-error" : undefined
            }
          />
          {fieldError("deliveryDate") && (
            <p className="field-error" id="deliveryDate-error" role="alert">
              {fieldError("deliveryDate")}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="deliveryTime">Delivery time</label>
          <select
            id="deliveryTime"
            name="deliveryTime"
            value={values.deliveryTime}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldError("deliveryTime"))}
            aria-describedby={
              fieldError("deliveryTime") ? "deliveryTime-error" : undefined
            }
          >
            <option value="">Choose a time…</option>
            <option value="09:00-12:00">Morning (9:00 – 12:00)</option>
            <option value="12:00-15:00">Midday (12:00 – 15:00)</option>
            <option value="15:00-18:00">Afternoon (15:00 – 18:00)</option>
            <option value="18:00-20:00">Evening (18:00 – 20:00)</option>
          </select>
          {fieldError("deliveryTime") && (
            <p className="field-error" id="deliveryTime-error" role="alert">
              {fieldError("deliveryTime")}
            </p>
          )}
        </div>
      </div>

      <button type="submit" className="btn-submit">
        Place order
      </button>
    </form>
  );
}

export default OrderForm;