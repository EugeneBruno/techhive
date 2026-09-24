import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
  collection,
  getCountFromServer,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import "../App.css";

function Admin() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    setError("");

    try {
      const [productsSnapshot, ordersSnapshot, customersSnapshot] =
        await Promise.all([
          getCountFromServer(collection(db, "products")),
          getCountFromServer(collection(db, "orders")),
          getCountFromServer(collection(db, "users")),
        ]);

      setStats({
        products: productsSnapshot.data().count,
        orders: ordersSnapshot.data().count,
        customers: customersSnapshot.data().count,
      });
    } catch (error) {
      console.error("Error loading admin statistics:", error);

      setError(
        "Unable to load dashboard statistics. Please check your Firestore permissions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <main className="admin-page">
      <Link
        to="/"
        className="floating-back-button"
        aria-label="Back to home"
      >
        <ArrowBackIcon />
        <span>Back to Home</span>
      </Link>

      <div className="admin-container">
        {/* HEADER */}
        <div className="admin-header">
          <div>
            <p className="page-eyebrow">TechHive Administration</p>

            <h1>Admin Dashboard.</h1>

            <p>
              Manage your products, orders, and store operations
              from one place.
            </p>
          </div>

          <button
            type="button"
            className="admin-refresh-button"
            onClick={fetchStats}
            disabled={loading}
          >
            <RefreshIcon
              className={loading ? "admin-refresh-icon spinning" : ""}
            />
            Refresh
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="admin-error">
            <strong>Dashboard statistics unavailable</strong>
            <span>{error}</span>
          </div>
        )}

        {/* STATISTICS */}
        <section className="admin-stats-grid">
          {/* PRODUCTS */}
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Inventory2OutlinedIcon />
            </div>

            <div>
              <span>Products</span>

              <strong>
                {loading ? "—" : stats.products}
              </strong>

              <p>Products in catalogue</p>
            </div>
          </div>

          {/* ORDERS */}
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <ShoppingBagOutlinedIcon />
            </div>

            <div>
              <span>Orders</span>

              <strong>
                {loading ? "—" : stats.orders}
              </strong>

              <p>Total customer orders</p>
            </div>
          </div>

          {/* CUSTOMERS */}
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <GroupOutlinedIcon />
            </div>

            <div>
              <span>Customers</span>

              <strong>
                {loading ? "—" : stats.customers}
              </strong>

              <p>Registered customers</p>
            </div>
          </div>
        </section>

        {/* MANAGEMENT */}
        <section className="admin-management-section">
          <div className="admin-section-heading">
            <p className="page-eyebrow">Store Management</p>

            <h2>Manage your store.</h2>

            <p>
              Control your catalogue and manage customer orders.
            </p>
          </div>

          <div className="admin-management-grid">
            {/* PRODUCT MANAGEMENT */}
            <div className="admin-management-card">
              <div className="admin-management-icon">
                <Inventory2OutlinedIcon />
              </div>

              <div className="admin-management-content">
                <h3>Product Management</h3>

                <p>
                  Add new products, update existing products, and
                  remove products from your TechHive catalogue.
                </p>

                <div className="admin-card-actions">
                  <Link
                    to="/admin/products"
                    className="admin-primary-button"
                  >
                    <AddBoxOutlinedIcon />
                    Add Product
                  </Link>

                  <Link
                    to="/admin/products"
                    className="admin-secondary-button"
                  >
                    <Inventory2OutlinedIcon />
                    Manage Products
                  </Link>
                </div>
              </div>
            </div>

            {/* ORDER MANAGEMENT */}
            <div className="admin-management-card">
              <div className="admin-management-icon">
                <ShoppingBagOutlinedIcon />
              </div>

              <div className="admin-management-content">
                <h3>Order Management</h3>

                <p>
                  View customer orders, inspect order details, and
                  manage order status.
                </p>

                <div className="admin-card-actions">
                  <Link
                    to="/admin/orders"
                    className="admin-primary-button"
                  >
                    <ManageSearchOutlinedIcon />
                    View Orders
                  </Link>

                  <Link
                    to="/admin/orders"
                    className="admin-secondary-button"
                  >
                    <ShoppingBagOutlinedIcon />
                    Manage Orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK INFO */}
        <section className="admin-info-section">
          <div className="admin-info-icon">
            <GroupOutlinedIcon />
          </div>

          <div>
            <h3>Admin Access</h3>

            <p>
              This dashboard is protected by your Firebase admin
              role. Only users with an <strong>admin</strong> role
              can access administrative features.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Admin;