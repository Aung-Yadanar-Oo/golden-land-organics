import products from "../data/products";
import ProductCard from "../components/ProductsCard";

function Products() {
  return (
    <main>
      <section className="page-section" aria-labelledby="products-heading">
        <h1 id="products-heading">Our Products</h1>
        <p>
          Everything we sell is grown or produced by small, local farms and
          cooperatives across Myanmar. Browse the full catalog below, or
          head to the order page to place a request.
        </p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Products;