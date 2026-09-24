import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import "../App.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const orderStatuses = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const fetchedOrders = snapshot.docs.map(
          (orderDocument) => ({
            id: orderDocument.id,
            ...orderDocument.data(),
          })
        );

        setOrders(fetchedOrders);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading orders:", error);

        setError(
          "Unable to load orders. Please check your Firestore permissions."
        );

        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const toggleOrder = (orderId) => {
    setExpandedOrders((currentOrders) => ({
      ...currentOrders,
      [orderId]: !currentOrders[orderId],
    }));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (!newStatus) return;

    try {
      setError("");
      setUpdatingOrderId(orderId);

      const orderRef = doc(db, "orders", orderId);

      await updateDoc(orderRef, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating order status:", error);

      setError(
        "Unable to update the order status. Please check your Firestore permissions and try again."
      );
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) {
      return "Date unavailable";
    }

    return timestamp.toDate().toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp?.toDate) {
      return "Date unavailable";
    }

    return timestamp.toDate().toLocaleString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-NG");
  };

  const getItemCount = (items = []) => {
    return items.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );
  };

  const getStatusClass = (status = "") => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <main className="admin-orders-page">
      <Link
        to="/admin"
        className="floating-back-button"
        aria-label="Back to admin dashboard"
      >
        <ArrowBackIcon />
        <span>Back to Dashboard</span>
      </Link>

      <div className="admin-orders-container">
        {/* HEADER */}
        <div className="admin-orders-header">
          <div>
            <p className="page-eyebrow">Store Management</p>

            <h1>Orders.</h1>

            <p>
              Review customer orders and manage their order
              status.
            </p>
          </div>

          <button
            type="button"
            className="admin-refresh-button"
            onClick={() => window.location.reload()}
          >
            <RefreshIcon />
            Refresh
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="admin-error">
            <strong>Something went wrong</strong>
            <span>{error}</span>
          </div>
        )}

        {/* ORDER SUMMARY */}
        <div className="admin-orders-summary">
          <div className="admin-orders-summary-icon">
            <ShoppingBagOutlinedIcon />
          </div>

          <div>
            <span>Total Orders</span>

            <strong>
              {loading ? "—" : orders.length}
            </strong>
          </div>
        </div>

        {/* ORDERS */}
        <section className="admin-orders-section">
          {loading ? (
            <div className="admin-orders-empty">
              <ShoppingBagOutlinedIcon />

              <h3>Loading orders...</h3>

              <p>
                Please wait while your orders are loaded.
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="admin-orders-empty">
              <ShoppingBagOutlinedIcon />

              <h3>No orders yet</h3>

              <p>
                Customer orders will appear here after they place
                an order.
              </p>
            </div>
          ) : (
            <div className="admin-orders-list">
              {orders.map((order) => {
                const isExpanded =
                  expandedOrders[order.id] || false;

                const itemCount = getItemCount(order.items);

                const customerName =
                  `${order.customer?.firstName || ""} ${
                    order.customer?.lastName || ""
                  }`.trim() || "Customer";

                const currentStatus =
                  order.status || "Pending";

                const isUpdating =
                  updatingOrderId === order.id;

                return (
                  <div
                    className={`admin-order-card ${
                      isExpanded
                        ? "admin-order-card-expanded"
                        : ""
                    }`}
                    key={order.id}
                  >
                    {/* ORDER HEADER */}
                    <div className="admin-order-card-header">
                      <div className="admin-order-reference">
                        <span>Order Reference</span>

                        <strong>{order.id}</strong>
                      </div>

                      <span
                        className={`admin-order-status ${getStatusClass(
                          currentStatus
                        )}`}
                      >
                        {currentStatus}
                      </span>
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="admin-order-summary-grid">
                      <div>
                        <span>Customer</span>

                        <strong>{customerName}</strong>
                      </div>

                      <div>
                        <span>Date</span>

                        <strong>
                          {formatDate(order.createdAt)}
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

                    {/* VIEW DETAILS */}
                    <button
                      type="button"
                      className="admin-order-toggle"
                      onClick={() =>
                        toggleOrder(order.id)
                      }
                      aria-expanded={isExpanded}
                    >
                      <span>
                        {isExpanded
                          ? "Hide Order Details"
                          : "View Order Details"}
                      </span>

                      <ExpandMoreIcon
                        className={
                          isExpanded
                            ? "admin-order-toggle-icon expanded"
                            : "admin-order-toggle-icon"
                        }
                      />
                    </button>

                    {/* ORDER DETAILS */}
                    {isExpanded && (
                      <div className="admin-order-details">
                        {/* CUSTOMER */}
                        <div className="admin-order-detail-section">
                          <div className="admin-order-detail-heading">
                            <GroupOutlinedIcon />

                            <h3>Customer Information</h3>
                          </div>

                          <div className="admin-order-information-grid">
                            <div>
                              <span>Name</span>

                              <strong>
                                {customerName}
                              </strong>
                            </div>

                            <div>
                              <span>Email</span>

                              <strong>
                                {order.customer?.email ||
                                  "Not provided"}
                              </strong>
                            </div>

                            <div>
                              <span>Phone</span>

                              <strong>
                                {order.customer?.phone ||
                                  "Not provided"}
                              </strong>
                            </div>

                            <div>
                              <span>Order Date</span>

                              <strong>
                                {formatDateTime(
                                  order.createdAt
                                )}
                              </strong>
                            </div>
                          </div>
                        </div>

                        {/* DELIVERY */}
                        <div className="admin-order-detail-section">
                          <div className="admin-order-detail-heading">
                            <LocalShippingOutlinedIcon />

                            <h3>Delivery Information</h3>
                          </div>

                          <div className="admin-order-information-grid">
                            <div className="admin-order-information-full">
                              <span>Address</span>

                              <strong>
                                {order.deliveryAddress
                                  ?.address ||
                                  "Not provided"}
                              </strong>
                            </div>

                            <div>
                              <span>City</span>

                              <strong>
                                {order.deliveryAddress
                                  ?.city ||
                                  "Not provided"}
                              </strong>
                            </div>

                            <div>
                              <span>State</span>

                              <strong>
                                {order.deliveryAddress
                                  ?.state ||
                                  "Not provided"}
                              </strong>
                            </div>

                            <div className="admin-order-information-full">
                              <span>Delivery Note</span>

                              <strong>
                                {order.deliveryAddress
                                  ?.deliveryNote ||
                                  "No delivery note"}
                              </strong>
                            </div>
                          </div>
                        </div>

                        {/* ITEMS */}
                        <div className="admin-order-detail-section">
                          <div className="admin-order-detail-heading">
                            <Inventory2OutlinedIcon />

                            <h3>Ordered Items</h3>
                          </div>

                          {order.items?.length > 0 ? (
                            <div className="admin-order-items-list">
                              {order.items.map(
                                (item, index) => (
                                  <div
                                    className="admin-order-item"
                                    key={`${order.id}-${item.productId}-${index}`}
                                  >
                                    <div className="admin-order-item-image">
                                      {item.image ? (
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                        />
                                      ) : (
                                        <Inventory2OutlinedIcon />
                                      )}
                                    </div>

                                    <div className="admin-order-item-info">
                                      <h4>{item.name}</h4>

                                      {item.category && (
                                        <span>
                                          {item.category}
                                        </span>
                                      )}

                                      <p>
                                        ₦
                                        {formatPrice(
                                          item.price
                                        )}{" "}
                                        × {item.quantity}
                                      </p>
                                    </div>

                                    <strong>
                                      ₦
                                      {formatPrice(
                                        item.subtotal ??
                                          item.price *
                                            item.quantity
                                      )}
                                    </strong>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="admin-orders-message">
                              No item details available.
                            </p>
                          )}

                          <div className="admin-order-total">
                            <div>
                              <span>Subtotal</span>

                              <strong>
                                ₦
                                {formatPrice(
                                  order.subtotal
                                )}
                              </strong>
                            </div>

                            <div>
                              <span>Delivery Fee</span>

                              <strong>
                                ₦
                                {formatPrice(
                                  order.deliveryFee
                                )}
                              </strong>
                            </div>

                            <div className="admin-order-grand-total">
                              <span>Total</span>

                              <strong>
                                ₦
                                {formatPrice(
                                  order.total
                                )}
                              </strong>
                            </div>
                          </div>
                        </div>

                        {/* PAYMENT & STATUS */}
                        <div className="admin-order-detail-section">
                          <div className="admin-order-payment">
                            <div>
                              <span>Payment Method</span>

                              <strong>
                                {order.paymentMethod ||
                                  "Not specified"}
                              </strong>
                            </div>

                            <div className="admin-order-status-control">
                              <label
                                htmlFor={`order-status-${order.id}`}
                              >
                                Order Status
                              </label>

                              <select
                                id={`order-status-${order.id}`}
                                value={currentStatus}
                                onChange={(event) =>
                                  handleStatusChange(
                                    order.id,
                                    event.target.value
                                  )
                                }
                                disabled={isUpdating}
                              >
                                {orderStatuses.map(
                                  (status) => (
                                    <option
                                      key={status}
                                      value={status}
                                    >
                                      {status}
                                    </option>
                                  )
                                )}
                              </select>

                              {isUpdating && (
                                <span className="admin-order-status-saving">
                                  Updating...
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminOrders;