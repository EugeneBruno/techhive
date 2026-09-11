import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "../context/CartContext";
import { formartCurrency } from "../utils/formatCurrency";
import "../App.css";

function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="cart-header">
            <p className="page-eyebrow">Your Selection</p>
            <h1>Your Cart</h1>
            <p>
              Review the products you have selected before proceeding to
              checkout.
            </p>
          </div>

          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBagOutlinedIcon />
            </div>

            <h2>Your cart is empty</h2>

            <p>
              You have not added any products to your cart yet. Explore our
              collection and find something you like.
            </p>

            <Link to="/products" className="primary-button">
              Explore Products
              <ArrowForwardIcon />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <p className="page-eyebrow">Your Selection</p>
          <h1>Your Cart</h1>
          <p>
            Review your selected products and adjust quantities before
            checkout.
          </p>
        </div>

        <div className="cart-layout">
          <section className="cart-items-section">
            <div className="cart-items-header">
              <h2>Cart Items</h2>

              <button
                type="button"
                className="clear-cart-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>

            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <Link
                    to={`/products/${item.id}`}
                    className="cart-item-image"
                  >
                    <img src={item.image} alt={item.name} />
                  </Link>

                  <div className="cart-item-details">
                    <p className="cart-item-category">{item.category}</p>

                    <Link
                      to={`/products/${item.id}`}
                      className="cart-item-name"
                    >
                      {item.name}
                    </Link>

                    <p className="cart-item-price">
                      {formartCurrency(item.price)}
                    </p>

                    <div className="cart-item-actions">
                      <div className="cart-quantity-control">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <RemoveIcon />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <AddIcon />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-item-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <DeleteIcon />
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="cart-item-total">
                    {formartCurrency(item.price * item.quantity)}
                  </p>
                </article>
              ))}
            </div>

            <Link to="/products" className="continue-shopping-link">
              Continue Shopping
              <ArrowForwardIcon />
            </Link>
          </section>

          <aside className="cart-summary">
            <p className="cart-summary-eyebrow">Order Summary</p>

            <h2>Summary</h2>

            <div className="cart-summary-line">
              <span>Subtotal</span>
              <strong>{formartCurrency(cartTotal)}</strong>
            </div>

            <div className="cart-summary-line">
              <span>Delivery</span>
              <strong>Calculated at checkout</strong>
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-total">
              <span>Total</span>
              <strong>{formartCurrency(cartTotal)}</strong>
            </div>

            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
              <ArrowForwardIcon />
            </Link>

            <p className="cart-summary-note">
              Delivery charges and final order details will be confirmed
              during checkout.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;