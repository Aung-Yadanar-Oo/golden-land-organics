import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductsCard";

function Home() {
  const featured = products.slice(0, 3);

  return (
    <main>
      <section className="banner" aria-labelledby="banner-heading">
        <div className="banner-content">
          <p className="eyebrow">Yangon, Myanmar</p>
          <h1 id="banner-heading">
            Local organic goods,
            <br />
            straight from Myanmar
          </h1>
          <p className="banner-text">
            We work directly with smallholder farmers across the Ayeyarwady
            Delta and the hills of Shan State to bring you organic rice,
            tea, honey, dried fruits and spices — grown without synthetic
            pesticides, and delivered fresh to your door.
          </p>
          <Link className="btn" to="/order">
            Place an order
          </Link>
        </div>
      </section>

      <section className="highlights" aria-labelledby="featured-heading">
        <h2 id="featured-heading">Featured products</h2>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/products" className="btn-secondary">
          See all products →
        </Link>
      </section>
    </main>
  );
}

export default Home;