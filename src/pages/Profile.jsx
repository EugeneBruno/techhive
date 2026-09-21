import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";

import "../App.css";

function Profile() {
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();

  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState("");

  // Keeps track of which orders are expanded
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
        } else {
          setUserData({
            firstName: currentUser.displayName?.split(" ")[0] || "",
            lastName:
              currentUser.displayName?.split(" ").slice(1).join(" ") || "",
            email: currentUser.email || "",
            phone: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Unable to load your account information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }

    setOrdersLoading(true);

    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const fetchedOrders = snapshot.docs
          .map((orderDocument) => ({
            id: orderDocument.id,
            ...orderDocument.data(),
          }))
          .sort((firstOrder, secondOrder) => {
            const firstDate =
              firstOrder.createdAt?.toDate?.() || new Date(0);

            const secondDate =
              secondOrder.createdAt?.toDate?.() || new Date(0);

            return secondDate - firstDate;
          });

        setOrders(fetchedOrders);
        setOrdersLoading(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        setError("Unable to load your order history.");
        setOrdersLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Unable to sign out. Please try again.");
    }
  };

  const toggleOrder = (orderId) => {
    setExpandedOrders((currentOrders) => ({
      ...currentOrders,
      [orderId]: !currentOrders[orderId],
    }));
  };

  const fullName =
    `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim() ||
    currentUser?.displayName ||
    "TechHive User";

  const formattedDate = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString(
        "en-NG",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "Not available";

  const formatOrderDate = (timestamp) => {
    if (!timestamp?.toDate) {
      return "Date unavailable";
    }

    return timestamp.toDate().toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getOrderItemCount = (items = []) => {
    return items.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );
  };

  const getOrderStatusClass = (status = "") => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-NG");
  };

  return (
    <main className="profile-page">
      <Link
        to="/"
        className="floating-back-button"
        aria-label="Back to home"
      >
        <ArrowBackIcon />
        <span>Back to Home</span>
      </Link>

      <div className="profile-container">
        <div className="profile-header">
          <p className="page-eyebrow">My Account</p>

          <h1>Your profile.</h1>

          <p>
            Manage your account details and review your TechHive activity.
          </p>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="profile-layout">
          {/* PROFILE SIDEBAR */}
          <aside className="profile-sidebar">
            <div className="profile-avatar">
              <AccountCircleIcon />
            </div>

            {loading ? (
              <>
                <h2>Loading...</h2>
                <p>Please wait</p>
              </>
            ) : (
              <>
                <h2>{fullName}</h2>
                <p>{currentUser?.email}</p>
              </>
            )}

            <button
              type="button"
              className="profile-sidebar-button"
              onClick={handleLogout}
              disabled={loading}
            >
              <LogoutIcon />
              Sign Out
            </button>
          </aside>

          {/* PROFILE CONTENT */}
          <section className="profile-content">
            {/* ACCOUNT INFORMATION */}
            <div className="profile-section">
              <div className="profile-section-icon">
                <AccountCircleIcon />
              </div>

              <div className="profile-section-details">
                <h2>Account Information</h2>

                {loading ? (
                  <p>Loading your account information...</p>
                ) : (
                  <div className="profile-information-grid">
                    <div>
                      <span>First Name</span>

                      <strong>
                        {userData?.firstName || "Not provided"}
                      </strong>
                    </div>

                    <div>
                      <span>Last Name</span>

                      <strong>
                        {userData?.lastName || "Not provided"}
                      </strong>
                    </div>

                    <div>
                      <span>Email Address</span>

                      <strong>
                        {userData?.email || currentUser?.email}
                      </strong>
                    </div>

                    <div>
                      <span>Phone Number</span>

                      <strong>
                        {userData?.phone || "Not provided"}
                      </strong>
                    </div>

                    <div>
                      <span>Account Created</span>

                      <strong>{formattedDate}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ORDER HISTORY */}
            <div className="profile-section profile-orders-section">
              <div className="profile-section-icon">
                <ShoppingBagOutlinedIcon />
              </div>

              <div className="profile-section-details">
                <h2>Order History</h2>

                <p>
                  Review your previous purchases and track your current
                  orders.
                </p>

                {ordersLoading ? (
                  <p className="profile-orders-message">
                    Loading your orders...
                  </p>
                ) : orders.length === 0 ? (
                  <div className="profile-orders-empty">
                    <ShoppingBagOutlinedIcon />

                    <h3>No orders yet</h3>

                    <p>
                      Your completed purchases will appear here after you
                      place your first order.
                    </p>

                    <Link
                      to="/products"
                      className="profile-orders-button"
                    >
                      Explore Products
                    </Link>
                  </div>
                ) : (
                  <div className="profile-orders-list">
                    {orders.map((order) => {
                      const itemCount = getOrderItemCount(order.items);

                      const isExpanded =
                        expandedOrders[order.id] || false;

                      return (
                        <div
                          className={`profile-order-card ${
                            isExpanded
                              ? "profile-order-card-expanded"
                              : ""
                          }`}
                          key={order.id}
                        >
                          {/* ORDER HEADER */}
                          <div className="profile-order-card-header">
                            <div>
                              <span>Order Reference</span>

                              <strong>{order.id}</strong>
                            </div>

                            <span
                              className={`profile-order-status ${getOrderStatusClass(
                                order.status
                              )}`}
                            >
                              {order.status || "Pending"}
                            </span>
                          </div>

                          {/* ORDER SUMMARY */}
                          <div className="profile-order-card-details">
                            <div>
                              <span>Date</span>

                              <strong>
                                {formatOrderDate(order.createdAt)}
                              </strong>
                            </div>

                            <div>
                              <span>Items</span>

                              <strong>
                                {itemCount}{" "}
                                {itemCount === 1
                                  ? "item"
                                  : "items"}
                              </strong>
                            </div>

                            <div>
                              <span>Total</span>

                              <strong>
                                ₦{formatPrice(order.total)}
                              </strong>
                            </div>
                          </div>

                          {/* VIEW ITEMS BUTTON */}
                          <button
                            type="button"
                            className="profile-order-toggle"
                            onClick={() => toggleOrder(order.id)}
                            aria-expanded={isExpanded}
                          >
                            <span>
                              {isExpanded
                                ? "Hide Items"
                                : "View Items"}
                            </span>

                            <ExpandMoreIcon
                              className={
                                isExpanded
                                  ? "profile-order-toggle-icon expanded"
                                  : "profile-order-toggle-icon"
                              }
                            />
                          </button>

                          {/* ORDER ITEMS */}
                          {isExpanded && (
                            <div className="profile-order-items">
                              <div className="profile-order-items-heading">
                                <h3>Order Items</h3>
                              </div>

                              {order.items?.length > 0 ? (
                                <div className="profile-order-items-list">
                                  {order.items.map((item, index) => (
                                    <div
                                      className="profile-order-item"
                                      key={`${order.id}-${item.productId}-${index}`}
                                    >
                                      <div className="profile-order-item-image">
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                        />
                                      </div>

                                      <div className="profile-order-item-info">
                                        <h4>{item.name}</h4>

                                        {item.category && (
                                          <span>
                                            {item.category}
                                          </span>
                                        )}

                                        <p>
                                          ₦{formatPrice(item.price)} ×{" "}
                                          {item.quantity}
                                        </p>
                                      </div>

                                      <strong className="profile-order-item-subtotal">
                                        ₦
                                        {formatPrice(
                                          item.subtotal ??
                                            item.price *
                                              item.quantity
                                        )}
                                      </strong>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="profile-orders-message">
                                  No item details are available for this
                                  order.
                                </p>
                              )}

                              <div className="profile-order-items-total">
                                <span>Order Total</span>

                                <strong>
                                  ₦{formatPrice(order.total)}
                                </strong>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* SIGN OUT */}
            <div className="profile-section">
              <div className="profile-section-icon">
                <LogoutIcon />
              </div>

              <div className="profile-signout-content">
                <h2>Sign Out</h2>

                <p>
                  Sign out of your TechHive account on this device.
                </p>

                <button
                  type="button"
                  className="profile-logout-button"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Profile;