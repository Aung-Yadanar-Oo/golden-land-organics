# Golden Land Organics

A React web app for **Golden Land Organics**, an online shop selling local
organic products from Myanmar — rice, tea, honey, dried fruits & nuts, and
spices — direct from smallholder farms to the customer's door.

This project was built as a front-end capstone: a small multi-page React
app with client-side routing, a validated order form, and a unit test
suite covering both the validation logic and the rendered form.

## Features

- **Home / Products / Order / About** pages via React Router
- A product catalog (`src/data/products.js`) shared by the homepage
  highlights, the full products page, and the order form's dropdown
- A fully controlled, validated **order form**: customer name, email,
  product, quantity, delivery address, delivery date, and delivery time
- Field-level validation (required fields, email format, quantity bounds,
  no past delivery dates) with accessible error messages
  (`aria-invalid`, `aria-describedby`, `role="alert"`)
- Responsive layout (the date/time fields stack on narrow screens)
- 23 unit tests: 17 covering the validation rules directly, 6 covering
  the rendered form's behavior via React Testing Library

## Getting started

### Prerequisites

- Node.js 16 or later (includes npm)
- Git

### Installation

    git clone <your-repository-url>
    cd golden-land-organics
    npm install

### Running the app locally

    npm start

This starts the development server at http://localhost:3000.
The page reloads automatically as you edit files.

### Running the tests

    npm test

This runs the full Jest test suite in watch mode. To run it once and
exit (useful in CI or for a quick check):

    CI=true npm test

### Building for production

    npm run build

This produces an optimized static build in the `build/` folder, ready
to deploy to any static host.

## Project structure

    src/
      components/
        Header.js                  Site navigation
        Footer.js                  Site footer
        ProductCard.js              Reusable product display card
        OrderForm.js                 The order form itself
        OrderForm.validate.js         Validation logic, kept separate from
                                        the component so it can be unit
                                        tested without rendering any JSX
        OrderForm.validate.test.js   Unit tests for validation rules
        OrderForm.test.js             Unit tests for the rendered form
      pages/
        Home.js                     Landing page with featured products
        Products.js                  Full product catalog
        Order.js                      Order page (wraps OrderForm, handles
                                        the confirmation/error message)
        About.js                     About page
      data/
        products.js                  Single source of truth for all products
      App.js                        Route definitions
      index.js                      App entry point
      index.css                     Global styles

## Notes on validation

Validation lives in `OrderForm.validate.js`, separate from the
`OrderForm` component. This keeps the rules easy to test directly
(`OrderForm.validate.test.js`) without needing to render the DOM, and
keeps `OrderForm.js` focused on wiring state to the UI.

Validation runs on blur (so a field only shows an error once the user
has interacted with it) and again on submit (so nothing can be
submitted with an invalid or missing field, even if the user never
blurs a particular input).

## A note on eslint-config-react-app

If `npm run build` or `npm start` fails with an ESLint error mentioning
`jest/globals`, that's a known compatibility gap between
`eslint-config-react-app@7.0.1` (bundled with `react-scripts@5.0.1`)
and certain resolved `eslint`/`eslint-plugin-jest` version combinations.
This repository ships a `.env` file with `DISABLE_ESLINT_PLUGIN=true`
to avoid it — this only disables build-time lint warnings and has no
effect on the app's behavior or the test suite.

## License

This project was built for educational purposes as part of a front-end
development capstone.