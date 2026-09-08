import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { formartCurrency } from "../utils/formatCurrency";
function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="product-card"
    >
      <div className="product-image-container">

        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

      </div>

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h3>{product.name}</h3>

        <div className="product-bottom">

          <p className="product-price">
            {formartCurrency(product.price)}
          </p>

          <ArrowForwardIcon className="product-arrow" />

        </div>

      </div>

    </Link>
  );
}

export default ProductCard;