import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ProductCard from "../components/ProductCard";
import products from "../data/products";

import "../App.css";

const categories = [
  "All",
  "Smartphones",
  "Laptops",
  "Audio",
  "Accessories",
];

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get("category") || "All";
  const categoryFromUrl = categoryParam
    ? categoryParam.charAt(0).toUpperCase + categoryParam.slice(1)
    : "All" 

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
 
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: category.toLowerCase(),
      });
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category.toLowerCase() ===
          activeCategory.toLowerCase();

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "low-high") {
        return a.price - b.price;
      }

      if (sortOption === "high-low") {
        return b.price - a.price;
      }

      return 0;
    });

  return (
    <div className="products-page">

      {/* PAGE HEADER */}

      <section className="products-header">

        <p className="page-eyebrow">
          OUR COLLECTION
        </p>

        <h1>
          Technology for every day.
        </h1>

        <p>
          Explore our collection of carefully selected technology,
          built to keep you connected, productive, and entertained.
        </p>

      </section>


      {/* PRODUCT CONTROLS */}

      <section className="products-controls-container">

        <div className="products-controls">

          {/* SEARCH */}

          <div className="search-container">

            <SearchIcon />

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>


          {/* SORT */}

          <div className="sort-container">

            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
            >
              <option value="featured">
                Sort: Featured
              </option>

              <option value="low-high">
                Price: Low to High
              </option>

              <option value="high-low">
                Price: High to Low
              </option>

            </select>

            <KeyboardArrowDownIcon />

          </div>

        </div>


        {/* CATEGORY FILTERS */}

        <div className="category-filters">

          {categories.map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                handleCategoryChange(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

      </section>


      {/* PRODUCT RESULTS */}

      <section className="products-results">

        <div className="products-results-header">

          <p>
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>

        </div>


        <div className="products-grid">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))

          ) : (

            <div className="no-products">

              <h3>No products found.</h3>

              <p>
                Try adjusting your search or filters.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Products;