import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import "../App.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    badge: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const productRef = doc(db, "products", id);
        const productSnapshot = await getDoc(productRef);

        if (!productSnapshot.exists()) {
          setError("This product could not be found.");
          setLoading(false);
          return;
        }

        const product = productSnapshot.data();

        setFormData({
          name: product.name || "",
          category: product.category || "",
          price: product.price ?? "",
          image: product.image || "",
          badge: product.badge || "",
          description: product.description || "",
        });
      } catch (error) {
        console.error("Error loading product:", error);

        setError(
          "Unable to load this product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

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

      const productRef = doc(db, "products", id);

      await updateDoc(productRef, {
        name: formData.name.trim(),
        category: formData.category.trim(),
        price: Number(formData.price),
        image: formData.image.trim(),
        badge: formData.badge.trim() || null,
        description: formData.description.trim(),
        updatedAt: serverTimestamp(),
      });

      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);

      setError(
        "Unable to update the product. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="admin-product-form-page">
        <div className="admin-product-form-container">
          <div className="admin-products-empty">
            <h3>Loading product...</h3>

            <p>
              Please wait while the product information is
              retrieved.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error && !formData.name) {
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
          <div className="admin-products-empty">
            <h3>Unable to load product</h3>

            <p>{error}</p>

            <Link
              to="/admin/products"
              className="admin-primary-button"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

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

          <h1>Edit Product.</h1>

          <p>
            Update the information for this TechHive product.
          </p>
        </div>

        {/* FORM */}
        <form
          className="admin-product-form"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="admin-error">
              <strong>Unable to update product</strong>
              <span>{error}</span>
            </div>
          )}

          {/* PRODUCT INFORMATION */}
          <section className="admin-form-section">
            <div className="admin-form-section-header">
              <h2>Product Information</h2>

              <p>
                Update the information customers will see.
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

              {/* IMAGE */}
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
                  Use a direct image URL. The image will be
                  displayed in the product catalogue.
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
                Preview the product before saving your changes.
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

              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProduct;