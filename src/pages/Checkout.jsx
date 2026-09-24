import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import PaystackPop from "@paystack/inline-js";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import { formartCurrency } from "../utils/formatCurrency";
import "../App.css";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
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
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) {
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const savedUserData = userSnapshot.data();

          setFormData((currentData) => ({
            ...currentData,
            firstName:
              currentData.firstName || savedUserData.firstName || "",
            lastName:
              currentData.lastName || savedUserData.lastName || "",
            email:
              currentData.email ||
              savedUserData.email ||
              currentUser.email ||
              "",
            phone: currentData.phone || savedUserData.phone || "",
          }));
        } else {
          setFormData((currentData) => ({
            ...currentData,
            email:
              currentData.email || currentUser.email || "",
          }));
        }
      } catch (error) {
        console.error("Error loading checkout user data:", error);
      }
    };

    loadUserData();
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // Create the order as unpaid.
      const orderData = {
        userId: currentUser.uid,

        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },

        deliveryAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          deliveryNote: formData.deliveryNote,
        },

        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          category: item.category,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),

        subtotal: cartTotal,
        deliveryFee: 0,
        total: cartTotal,

        paymentMethod: "Paystack",
        paymentStatus: "Pending",
        paymentReference: null,

        status: "Pending",

        createdAt: serverTimestamp(),
      };

      const orderReference = await addDoc(
        collection(db, "orders"),
        orderData
      );

      const createdOrderId = orderReference.id;

      setOrderId(createdOrderId);

      // Get the Firebase authentication token.
      const idToken = await currentUser.getIdToken();

      // Initialize Paystack through our Vercel API.
      const initializeResponse = await fetch(
        "/api/initialize-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            orderId: createdOrderId,
          }),
        }
      );

      const initializeData = await initializeResponse.json();

      if (!initializeResponse.ok) {
        throw new Error(
          initializeData.message ||
            "Unable to initialize payment."
        );
      }

      if (!initializeData.accessCode) {
        throw new Error(
          "Paystack did not return a payment access code."
        );
      }

      // Open Paystack payment.
      const popup = new PaystackPop();

      popup.resumeTransaction(
        initializeData.accessCode,
        {
          onSuccess: async (transaction) => {
            try {
              setIsSubmitting(true);
              setError("");

              // Get a fresh Firebase token before verification.
              const verificationToken =
                await currentUser.getIdToken(true);

              // Verify payment through our Vercel API.
              const verifyResponse = await fetch(
                "/api/verify-payment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${verificationToken}`,
                  },
                  body: JSON.stringify({
                    reference: transaction.reference,
                  }),
                }
              );

              const verifyData = await verifyResponse.json();

              if (!verifyResponse.ok) {
                throw new Error(
                  verifyData.message ||
                    "Payment verification failed."
                );
              }

              if (verifyData.paymentStatus !== "Paid") {
                throw new Error(
                  "Payment could not be confirmed."
                );
              }

              // Payment has been successfully verified.
              clearCart();
              setOrderId(verifyData.orderId);
              setOrderPlaced(true);
            } catch (verificationError) {
              console.error(
                "Payment verification error:",
                verificationError
              );

              setError(
                verificationError.message ||
                  "Payment was completed but could not be verified. Please contact support."
              );
            } finally {
              setIsSubmitting(false);
            }
          },

          onCancel: () => {
            setIsSubmitting(false);
            setError(
              "Payment was cancelled. Your order has not been marked as paid."
            );
          },

          onError: (paymentError) => {
            console.error(
              "Paystack payment error:",
              paymentError
            );

            setIsSubmitting(false);
            setError(
              paymentError?.message ||
                "There was a problem opening the payment window."
            );
          },
        }
      );
    } catch (error) {
      console.error("Checkout error:", error);

      setError(
        error.message ||
          "We could not start your payment. Please try again."
      );

      setIsSubmitting(false);
    }
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

            <Link
              to="/products"
              className="primary-button"
            >
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

            <p className="page-eyebrow">
              Payment Successful
            </p>

            <h1>Thank you for your order.</h1>

            <p>
              Your payment has been confirmed and your order
              has been received successfully.
            </p>

            {orderId && (
              <p className="order-reference">
                Order Reference:{" "}
                <strong>{orderId}</strong>
              </p>
            )}

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
          <Link
            to="/cart"
            className="floating-back-button"
          >
            <ArrowBackIcon />
            Back to Cart
          </Link>

          <p className="page-eyebrow">
            Secure Checkout
          </p>

          <h1>Complete your order.</h1>

          <p>
            Provide your delivery details and complete your
            payment securely.
          </p>
        </div>

        <div className="checkout-layout">
          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
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
                  <label htmlFor="firstName">
                    First Name
                  </label>

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
                  <label htmlFor="lastName">
                    Last Name
                  </label>

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
                  <label htmlFor="email">
                    Email Address
                  </label>

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
                  <label htmlFor="phone">
                    Phone Number
                  </label>

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
                  <p>
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-field checkout-field-full">
                  <label htmlFor="address">
                    Street Address
                  </label>

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
                  <label htmlFor="city">
                    City
                  </label>

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
                  <label htmlFor="state">
                    State
                  </label>

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
                    Delivery Note{" "}
                    <span>(Optional)</span>
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
                  <p>
                    Complete your payment securely with Paystack.
                  </p>
                </div>
              </div>

              <div className="payment-placeholder">
                <div className="payment-placeholder-icon">
                  <ShoppingBagOutlinedIcon />
                </div>

                <div>
                  <h3>Paystack Secure Payment</h3>

                  <p>
                    After clicking "Pay Now", a secure Paystack
                    payment window will open. You can pay using
                    the available payment options.
                  </p>
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="checkout-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Opening Payment..."
                : "Pay Now"}

              {!isSubmitting && <ArrowForwardIcon />}
            </button>
          </form>

          <aside className="checkout-summary">
            <p className="cart-summary-eyebrow">
              Your Selection
            </p>

            <h2>Order Summary</h2>

            <div className="checkout-summary-items">
              {cartItems.map((item) => (
                <div
                  className="checkout-summary-item"
                  key={item.id}
                >
                  <div className="checkout-summary-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <span>{item.quantity}</span>
                  </div>

                  <div className="checkout-summary-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                  </div>

                  <strong>
                    {formartCurrency(
                      item.price * item.quantity
                    )}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-line">
              <span>Subtotal</span>

              <strong>
                {formartCurrency(cartTotal)}
              </strong>
            </div>

            <div className="checkout-summary-line">
              <span>Delivery</span>

              <strong>
                To be confirmed
              </strong>
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-total">
              <span>Total</span>

              <strong>
                {formartCurrency(cartTotal)}
              </strong>
            </div>

            <p className="checkout-summary-note">
              You will complete your payment securely through
              Paystack before your order is confirmed.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;