/**
 * Product catalog for Golden Land Organics.
 *
 * This is the single source of truth for products across the app —
 * both the homepage product cards and the order form's product
 * dropdown read from this array, so adding a new product only
 * requires one edit here.
 *
 * `unit` describes what one "quantity" of the product represents,
 * used to build accessible labels like "Quantity (kg)" on the form.
 */
const products = [
  {
    id: "jasmine-rice",
    name: "Organic Jasmine Rice",
    category: "Rice",
    unit: "kg",
    price: 3.5,
    description:
      "Fragrant, long-grain jasmine rice grown without synthetic pesticides in the Ayeyarwady Delta, hand-milled in small batches.",
  },
  {
    id: "black-rice",
    name: "Organic Black Rice",
    category: "Rice",
    unit: "kg",
    price: 4.75,
    description:
      "A nutrient-dense heirloom variety, sometimes called 'forbidden rice', with a deep purple color and nutty flavor.",
  },
  {
    id: "green-tea",
    name: "Myanmar Green Tea Leaves",
    category: "Tea",
    unit: "100g",
    price: 5.0,
    description:
      "Hand-picked green tea leaves from the hillside gardens of Shan State, lightly oxidized for a fresh, grassy taste.",
  },
  {
    id: "wild-forest-honey",
    name: "Wild Forest Honey",
    category: "Honey",
    unit: "jar (500g)",
    price: 8.25,
    description:
      "Raw, unfiltered honey harvested from wild hives in the forests of Bago, with a rich, floral sweetness.",
  },
  {
    id: "dried-tamarind",
    name: "Dried Tamarind",
    category: "Dried Fruits & Nuts",
    unit: "250g",
    price: 3.0,
    description:
      "Sun-dried tamarind pods with a tangy-sweet flavor, a staple in Myanmar cooking and a favorite snack on its own.",
  },
  {
    id: "roasted-cashews",
    name: "Roasted Cashews",
    category: "Dried Fruits & Nuts",
    unit: "250g",
    price: 6.5,
    description:
      "Cashews grown in the dry zones of central Myanmar, lightly roasted with a touch of sea salt.",
  },
  {
    id: "turmeric-powder",
    name: "Organic Turmeric Powder",
    category: "Spices",
    unit: "200g",
    price: 2.75,
    description:
      "Vivid, aromatic turmeric root, sun-dried and stone-ground the traditional way for maximum flavor and color.",
  },
  {
    id: "ginger-powder",
    name: "Organic Ginger Powder",
    category: "Spices",
    unit: "200g",
    price: 2.75,
    description:
      "Warm, peppery ginger root grown in Shan State, dried and ground fresh for cooking and tea.",
  },
];

export default products;