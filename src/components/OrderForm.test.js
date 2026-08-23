import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderForm from "./OrderForm";

describe("OrderForm", () => {
  test("renders all expected fields", () => {
    render(<OrderForm onOrderSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^product$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delivery address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delivery date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delivery time/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /place order/i })
    ).toBeInTheDocument();
  });

  test("shows a validation error when a required field is left blank on submit", async () => {
    const user = userEvent.setup();
    render(<OrderForm onOrderSubmit={jest.fn()} />);

    await user.click(screen.getByRole("button", { name: /place order/i }));

    expect(
      await screen.findByText(/please enter your name/i)
    ).toBeInTheDocument();
  });

  test("does not call onOrderSubmit while the form is invalid", async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    render(<OrderForm onOrderSubmit={handleSubmit} />);

    await user.click(screen.getByRole("button", { name: /place order/i }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test("marks the quantity field invalid after it is touched with an out-of-range value", async () => {
    const user = userEvent.setup();
    render(<OrderForm onOrderSubmit={jest.fn()} />);

    const quantityInput = screen.getByLabelText(/quantity/i);
    await user.type(quantityInput, "0");
    await user.tab();

    expect(
      await screen.findByText(/quantity must be at least 1/i)
    ).toBeInTheDocument();
  });

  test("calls onOrderSubmit with the entered values once the form is fully valid", async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    render(<OrderForm onOrderSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/full name/i), "Aye Aye");
    await user.type(screen.getByLabelText(/email address/i), "aye@example.com");
    await user.selectOptions(
      screen.getByLabelText(/^product$/i),
      "jasmine-rice"
    );
    await user.type(screen.getByLabelText(/quantity/i), "2");
    await user.type(
      screen.getByLabelText(/delivery address/i),
      "123 Pansodan Street, Yangon"
    );

    const dateInput = screen.getByLabelText(/delivery date/i);
    // React tracks native input values via its own internal setter,
    // so writing dateInput.value directly (bypassing that tracker)
    // updates the DOM but never notifies React of the change. Using
    // the native HTMLInputElement value setter, then dispatching a
    // real "input" event, is the documented way to drive a native
    // date input under React + jsdom in tests.
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(dateInput, "2099-01-01");
    dateInput.dispatchEvent(new Event("input", { bubbles: true }));

    await user.selectOptions(
      screen.getByLabelText(/delivery time/i),
      "09:00-12:00"
    );

    await user.click(screen.getByRole("button", { name: /place order/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    const submittedOrder = handleSubmit.mock.calls[0][0];
    expect(submittedOrder.customerName).toBe("Aye Aye");
    expect(submittedOrder.product.id).toBe("jasmine-rice");
    expect(submittedOrder.quantity).toBe("2");
  });

  test("resets the form after a successful submission", async () => {
    const user = userEvent.setup();
    render(<OrderForm onOrderSubmit={jest.fn()} />);

    const nameInput = screen.getByLabelText(/full name/i);
    await user.type(screen.getByLabelText(/full name/i), "Aye Aye");
    await user.type(screen.getByLabelText(/email address/i), "aye@example.com");
    await user.selectOptions(
      screen.getByLabelText(/^product$/i),
      "jasmine-rice"
    );
    await user.type(screen.getByLabelText(/quantity/i), "2");
    await user.type(
      screen.getByLabelText(/delivery address/i),
      "123 Pansodan Street, Yangon"
    );

    const dateInput = screen.getByLabelText(/delivery date/i);
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(dateInput, "2099-01-01");
    dateInput.dispatchEvent(new Event("input", { bubbles: true }));

    await user.selectOptions(
      screen.getByLabelText(/delivery time/i),
      "09:00-12:00"
    );
    await user.click(screen.getByRole("button", { name: /place order/i }));

    expect(await screen.findByLabelText(/full name/i)).toHaveValue("");
    expect(nameInput).toHaveValue("");
  });
});