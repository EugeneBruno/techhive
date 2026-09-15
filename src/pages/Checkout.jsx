import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "../context/CartContext";
import { formartCurrency } from "../utils/formatCurrency";
import "../App.css";

function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    deliveryNote: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setOrderPlaced(true);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-empty">
            <div className="checkout-empty-icon">
              <ShoppingBagOutlinedIcon />
            </div>

            <h1>Your cart is empty</h1>

            <p>
              Add products to your cart before proceeding to checkout.
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

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <div className="order-success">
            <div className="order-success-icon">
              <ShoppingBagOutlinedIcon />
            </div>

            <p className="page-eyebrow">Order Received</p>

            <h1>Thank you for your order.</h1>

            <p>
              Your order details have been received. Our team will contact you
              to confirm delivery and payment arrangements.
            </p>

            <button
              type="button"
              className="checkout-button success-button"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
              <ArrowForwardIcon />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <Link to="/cart" className="floating-back-button">
            <ArrowBackIcon />
            Back to Cart
          </Link>

          <p className="page-eyebrow">Secure Checkout</p>

          <h1>Complete your order.</h1>

          <p>
            Provide your delivery details so we can prepare your order.
          </p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <section className="checkout-section">
              <div className="checkout-section-heading">
                <span>01</span>
                <div>
                  <h2>Contact Information</h2>
                  <p>How can we reach you?</p>
                </div>
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08012345678"
                    required
                  />
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-heading">
                <span>02</span>
                <div>
                  <h2>Delivery Address</h2>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-field checkout-field-full">
                  <label htmlFor="address">Street Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete delivery address"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    required
                  />
                </div>

                <div className="checkout-field checkout-field-full">
                  <label htmlFor="deliveryNote">
                    Delivery Note <span>(Optional)</span>
                  </label>
                  <textarea
                    id="deliveryNote"
                    name="deliveryNote"
                    value={formData.deliveryNote}
                    onChange={handleChange}
                    placeholder="Add any instructions for delivery"
                    rows="4"
                  />
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-heading">
                <span>03</span>
                <div>
                  <h2>Payment Method</h2>
                  <p>Choose how you would like to pay.</p>
                </div>
              </div>

              <div className="payment-placeholder">
                <div className="payment-placeholder-icon">
                  <ShoppingBagOutlinedIcon />
                </div>

                <div>
                  <h3>Payment integration coming next</h3>
                  <p>
                    Your order will be reviewed and payment arrangements will
                    be confirmed during the next stage.
                  </p>
                </div>
              </div>
            </section>

            <button type="submit" className="checkout-submit-button">
              Place Order
              <ArrowForwardIcon />
            </button>
          </form>

          <aside className="checkout-summary">
            <p className="cart-summary-eyebrow">Your Selection</p>

            <h2>Order Summary</h2>

            <div className="checkout-summary-items">
              {cartItems.map((item) => (
                <div className="checkout-summary-item" key={item.id}>
                  <div className="checkout-summary-image">
                    <img src={item.image} alt={item.name} />
                    <span>{item.quantity}</span>
                  </div>

                  <div className="checkout-summary-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                  </div>

                  <strong>
                    {formartCurrency(item.price * item.quantity)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-line">
              <span>Subtotal</span>
              <strong>{formartCurrency(cartTotal)}</strong>
            </div>

            <div className="checkout-summary-line">
              <span>Delivery</span>
              <strong>To be confirmed</strong>
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-total">
              <span>Total</span>
              <strong>{formartCurrency(cartTotal)}</strong>
            </div>

            <p className="checkout-summary-note">
              Delivery charges and payment details will be confirmed before
              your order is finalized.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;