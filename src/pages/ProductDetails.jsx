import { useState } from "react";

import { Link, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import products from "../data/products";

import { formartCurrency } from "../utils/formatCurrency";

import { useCart } from "../context/CartContext";

import "../App.css";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const { cartItems, addToCart } = useCart();

  const existingCartItem = cartItems.find(
    (item) => item.id === product?.id
  );

  const [quantity, setQuantity] = useState(
    existingCartItem?.quantity || 1
  );

  const [showNotification, setShowNotification] = useState(false);

  if (!product) {
    return (
      <main className="product-details-page">
        <div className="product-not-found">
          <p className="page-eyebrow">PRODUCT NOT FOUND</p>

          <h1>We couldn't find that product.</h1>

          <p>
            The product you're looking for may have been removed
            or the link may be incorrect.
          </p>

          <Link
            to="/products"
            className="primary-button"
          >
            <ArrowBackIcon />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  const handleAddToCart = () => {
    const previousQuantity = existingCartItem?.quantity || 0;

    const quantityToAdd = quantity - previousQuantity;

    if (quantityToAdd > 0) {
      addToCart(product, quantityToAdd);
    }

    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <main className="product-details-page">

      {/* CART NOTIFICATION */}

      {showNotification && (
        <div className="cart-notification">
          <ShoppingBagOutlinedIcon />

          <span>
            {quantity}× {product.name} added to cart
          </span>
        </div>
      )}

      {/* FLOATING BACK BUTTON */}

      <Link
        to="/products"
        className="floating-back-button"
      >
        <ArrowBackIcon />

        <span>Back to Products</span>
      </Link>


      <div className="product-details-container">

        <div className="product-details-grid">

          {/* PRODUCT IMAGE */}

          <div className="product-details-image">

            {product.badge && (
              <span className="product-details-badge">
                {product.badge}
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
            />

          </div>


          {/* PRODUCT INFORMATION */}

          <div className="product-details-info">

            <p className="product-details-category">
              {product.category}
            </p>

            <h1>{product.name}</h1>

            <p className="product-details-price">
              {formartCurrency(product.price)}
            </p>

            <div className="product-details-divider" />

            <p className="product-details-description">
              {product.description}
            </p>


            {/* QUANTITY */}

            <div className="quantity-section">

              <p>Quantity</p>

              <div className="quantity-control">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  <RemoveIcon />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  <AddIcon />
                </button>

              </div>

            </div>


            {/* ADD TO CART */}

            <button
              type="button"
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              <ShoppingBagOutlinedIcon />

              Add to Cart
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;