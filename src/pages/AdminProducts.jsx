import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import "../App.css";

import initialProducts from "../data/products";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load products from Firestore
  useEffect(() => {
    const productsRef = collection(db, "products");

    const unsubscribe = onSnapshot(
      productsRef,
      (snapshot) => {
        const fetchedProducts = snapshot.docs.map(
          (productDocument) => ({
            id: productDocument.id,
            ...productDocument.data(),
          })
        );

        setProducts(fetchedProducts);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading products:", error);

        setError("Unable to load products.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // Delete product
  const handleDelete = async (productId, productName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, "products", productId));
    } catch (error) {
      console.error("Error deleting product:", error);

      setError("Unable to delete this product.");
    }
  };

  // Format price
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-NG");
  };

  // Import existing products into Firestore
  const handleImportProducts = async () => {
    const confirmed = window.confirm(
      "Import the existing TechHive products into Firestore?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      for (const product of initialProducts) {
        await setDoc(
          doc(db, "products", String(product.id)),
          {
            ...product,
          }
        );
      }

      alert(
        `${initialProducts.length} products have been imported successfully.`
      );
    } catch (error) {
      console.error("Error importing products:", error);

      setError("Unable to import the existing products.");
    }
  };

  return (
    <main className="admin-products-page">
      <Link
        to="/admin"
        className="floating-back-button"
        aria-label="Back to admin dashboard"
      >
        <ArrowBackIcon />
        <span>Back to Dashboard</span>
      </Link>

      <div className="admin-products-container">
        {/* HEADER */}
        <div className="admin-products-header">
          <div>
            <p className="page-eyebrow">Store Management</p>

            <h1>Products.</h1>

            <p>
              Add, edit, and manage the products available in your
              TechHive catalogue.
            </p>
          </div>

          <div className="admin-products-header-actions">
            <button
              type="button"
              className="admin-secondary-button"
              onClick={handleImportProducts}
            >
              <Inventory2OutlinedIcon />
              Import Existing Products
            </button>

            <Link
              to="/admin/products/new"
              className="admin-primary-button"
            >
              <AddBoxOutlinedIcon />
              Add Product
            </Link>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="admin-error">
            <strong>Something went wrong</strong>

            <span>{error}</span>
          </div>
        )}

        {/* PRODUCTS */}
        <section className="admin-products-section">
          <div className="admin-products-section-header">
            <div>
              <h2>Product Catalogue</h2>

              <p>
                {products.length}{" "}
                {products.length === 1
                  ? "product"
                  : "products"}
              </p>
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="admin-products-empty">
              <Inventory2OutlinedIcon />

              <h3>Loading products...</h3>

              <p>
                Please wait while the catalogue is loaded.
              </p>
            </div>
          ) : products.length === 0 ? (
            /* EMPTY */
            <div className="admin-products-empty">
              <Inventory2OutlinedIcon />

              <h3>No products yet</h3>

              <p>
                Your product catalogue is empty. Import your
                existing products or add your first product.
              </p>

              <div className="admin-products-empty-actions">
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={handleImportProducts}
                >
                  <Inventory2OutlinedIcon />
                  Import Existing Products
                </button>

                <Link
                  to="/admin/products/new"
                  className="admin-primary-button"
                >
                  <AddBoxOutlinedIcon />
                  Add Product
                </Link>
              </div>
            </div>
          ) : (
            /* PRODUCT TABLE */
            <div className="admin-products-table-wrapper">
              <table className="admin-products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      {/* PRODUCT */}
                      <td>
                        <div className="admin-product-cell">
                          <div className="admin-product-image">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                              />
                            ) : (
                              <Inventory2OutlinedIcon />
                            )}
                          </div>

                          <div>
                            <strong>{product.name}</strong>

                            {product.description && (
                              <span>
                                {product.description.length > 70
                                  ? `${product.description.substring(
                                      0,
                                      70
                                    )}...`
                                  : product.description}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td>
                        {product.category || "Uncategorized"}
                      </td>

                      {/* PRICE */}
                      <td>
                        <strong>
                          ₦{formatPrice(product.price)}
                        </strong>
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="admin-product-actions">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="admin-table-action edit"
                          >
                            <EditOutlinedIcon />
                            Edit
                          </Link>

                          <button
                            type="button"
                            className="admin-table-action delete"
                            onClick={() =>
                              handleDelete(
                                product.id,
                                product.name
                              )
                            }
                          >
                            <DeleteIcon />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminProducts;