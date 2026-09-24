import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import "../App.css";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    badge: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!formData.category.trim()) {
      setError("Product category is required.");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setError("Please enter a valid product price.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Product description is required.");
      return;
    }

    if (!formData.image.trim()) {
      setError("Product image URL is required.");
      return;
    }

    try {
      setSaving(true);

      const productData = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        price: Number(formData.price),
        image: formData.image.trim(),
        badge: formData.badge.trim() || null,
        description: formData.description.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "products"), productData);

      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);

      setError(
        "Unable to add the product. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="admin-product-form-page">
      <Link
        to="/admin/products"
        className="floating-back-button"
        aria-label="Back to products"
      >
        <ArrowBackIcon />
        <span>Back to Products</span>
      </Link>

      <div className="admin-product-form-container">
        {/* HEADER */}
        <div className="admin-product-form-header">
          <p className="page-eyebrow">Product Management</p>

          <h1>Add Product.</h1>

          <p>
            Add a new product to the TechHive catalogue.
          </p>
        </div>

        {/* FORM */}
        <form
          className="admin-product-form"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="admin-error">
              <strong>Unable to save product</strong>
              <span>{error}</span>
            </div>
          )}

          {/* BASIC INFORMATION */}
          <section className="admin-form-section">
            <div className="admin-form-section-header">
              <h2>Product Information</h2>

              <p>
                Enter the basic information customers will see.
              </p>
            </div>

            <div className="admin-form-grid">
              {/* NAME */}
              <div className="admin-form-field admin-form-field-full">
                <label htmlFor="name">
                  Product Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. iPhone 16 Pro"
                  required
                />
              </div>

              {/* CATEGORY */}
              <div className="admin-form-field">
                <label htmlFor="category">
                  Category
                </label>

                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Smartphones"
                  required
                />
              </div>

              {/* PRICE */}
              <div className="admin-form-field">
                <label htmlFor="price">
                  Price (₦)
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="1500000"
                  required
                />
              </div>

              {/* BADGE */}
              <div className="admin-form-field">
                <label htmlFor="badge">
                  Badge
                  <span className="admin-field-optional">
                    Optional
                  </span>
                </label>

                <select
                  id="badge"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                >
                  <option value="">No Badge</option>
                  <option value="New">New</option>
                  <option value="Popular">Popular</option>
                  <option value="Best Seller">
                    Best Seller
                  </option>
                  <option value="Sale">Sale</option>
                </select>
              </div>

              {/* IMAGE URL */}
              <div className="admin-form-field admin-form-field-full">
                <label htmlFor="image">
                  Product Image URL
                </label>

                <input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  required
                />

                <small>
                  Use a direct image URL. The image will be displayed
                  in the product catalogue.
                </small>
              </div>

              {/* DESCRIPTION */}
              <div className="admin-form-field admin-form-field-full">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the product..."
                  rows="6"
                  required
                />
              </div>
            </div>
          </section>

          {/* PREVIEW */}
          <section className="admin-form-section">
            <div className="admin-form-section-header">
              <h2>Product Preview</h2>

              <p>
                Preview how the product image will look in the
                catalogue.
              </p>
            </div>

            <div className="admin-product-preview">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt={
                    formData.name || "Product preview"
                  }
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="admin-product-preview-placeholder">
                  Add an image URL above to preview the product.
                </div>
              )}

              <div className="admin-product-preview-info">
                <span>
                  {formData.category || "Category"}
                </span>

                <h3>
                  {formData.name || "Product Name"}
                </h3>

                <strong>
                  ₦
                  {Number(formData.price || 0).toLocaleString(
                    "en-NG"
                  )}
                </strong>

                {formData.badge && (
                  <small>{formData.badge}</small>
                )}
              </div>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="admin-form-actions">
            <Link
              to="/admin/products"
              className="admin-form-cancel-button"
            >
              <CancelOutlinedIcon />
              Cancel
            </Link>

            <button
              type="submit"
              className="admin-form-save-button"
              disabled={saving}
            >
              <SaveOutlinedIcon />

              {saving ? "Saving Product..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddProduct;