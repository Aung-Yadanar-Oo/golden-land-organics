function ProductCard({ product }) {
  return (
    <article className="product-card">
      <p className="product-category">{product.category}</p>
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">
        ${product.price.toFixed(2)} <span>/ {product.unit}</span>
      </p>
    </article>
  );
}

export default ProductCard;