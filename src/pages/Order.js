import { useState } from "react";
import OrderForm from "../components/OrderForm";

/**
 * Order page
 *
 * This project has no backend, so "placing an order" simply records
 * the order locally and shows a confirmation. handleOrderSubmit is
 * still written as if a real submission could fail (wrapped in
 * try/catch), both to demonstrate handling that edge case and so
 * swapping in a real API call later only means replacing the body
 * of the try block.
 */
function Order() {
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const handleOrderSubmit = (order) => {
    setSubmitError(null);
    try {
      if (!order.product) {
        // Defensive check: should be unreachable if OrderForm's own
        // validation ran correctly, but guards against this handler
        // ever being wired to a different, less-validated form later.
        throw new Error("No product was selected.");
      }
      setConfirmedOrder(order);
    } catch (error) {
      setSubmitError(
        "We couldn't process your order. Please check your details and try again."
      );
    }
  };

  return (
    <main>
      <section className="page-section" aria-labelledby="order-heading">
        <h1 id="order-heading">Place an Order</h1>
        <p>
          Fill in your details below and we'll get your order ready for
          delivery on the date and time you choose.
        </p>

        {submitError && (
          <p className="form-alert form-alert-error" role="alert">
            {submitError}
          </p>
        )}

        {confirmedOrder && (
          <p className="form-alert form-alert-success" role="status">
            Thanks, {confirmedOrder.customerName}! Your order for{" "}
            {confirmedOrder.quantity} {confirmedOrder.product.unit} of{" "}
            {confirmedOrder.product.name} is confirmed for{" "}
            {confirmedOrder.deliveryDate} ({confirmedOrder.deliveryTime}).
            We'll be in touch at {confirmedOrder.email}.
          </p>
        )}

        <OrderForm onOrderSubmit={handleOrderSubmit} />
      </section>
    </main>
  );
}

export default Order;