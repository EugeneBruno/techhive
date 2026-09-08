import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

import ProductCard from "../components/ProductCard"
import products from "../data/products";
import "../App.css";

const categories = [
  {
    name: "Smartphones",
    description: "Latest devices from leading brands.",
    icon: <PhoneIphoneIcon />,
    path: "/products?category=smartphones",
  },
  {
    name: "Laptops",
    description: "Powerful machines for work and play.",
    icon: <LaptopMacIcon />,
    path: "/products?category=laptops",
  },
  {
    name: "Audio",
    description: "Headphones, speakers, and more.",
    icon: <HeadphonesIcon />,
    path: "/products?category=audio",
  },
  {
    name: "Accessories",
    description: "Everything that completes your setup.",
    icon: <DevicesOtherIcon />,
    path: "/products?category=accessories",
  },
];

const benefits = [
  {
    title: "Curated Technology",
    description:
      "We carefully select products that combine quality, performance, and everyday usefulness.",
    icon: <WorkspacePremiumOutlinedIcon />,
  },
  {
    title: "Trusted Shopping",
    description:
      "Shop confidently with reliable products, transparent pricing, and a secure experience.",
    icon: <VerifiedUserOutlinedIcon />,
  },
  {
    title: "Fast & Reliable Delivery",
    description:
      "Get your technology delivered quickly and safely, so you can start using it sooner.",
    icon: <LocalShippingOutlinedIcon />,
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">WELCOME TO TECHHIVE</p>

          <h1>
            The technology
            <br />
            you need.
            <br />
            All in one place.
          </h1>

          <p className="hero-description">
            Explore a carefully selected collection of smartphones, laptops,
            audio devices, accessories, and the latest technology built for
            everyday life.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="primary-button">
              Shop Products
              <ArrowForwardIcon />
            </Link>

            <Link to="/products" className="secondary-button">
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="categories-section">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">EXPLORE</p>
            <h2>Shop by category.</h2>
          </div>

          <Link to="/products" className="view-all-link">
            View all products
            <ArrowForwardIcon />
          </Link>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              to={category.path}
              className="category-card"
              key={category.name}
            >
              <div className="category-icon">{category.icon}</div>

              <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>

              <ArrowForwardIcon className="category-arrow" />
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-products-section">
        <div className="section-header">

          <div>

            <p className="section-eyebrow">
              FEATURED
            </p>

            <h2>
              Technology worth exploring.
            </h2>

          </div>

          <Link
            to="/products"
            className="view-all-link"
          >
            View all products

            <ArrowForwardIcon />

          </Link>

        </div>
        <div className="products-grid">
         {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />

         ))}

        </div>
      </section>

      {/* WHY TECHHIVE SECTION */}
<section className="why-techhive-section">
  <div className="why-techhive-intro">
    <p className="section-eyebrow">WHY TECHHIVE</p>

    <h2>
      Technology selected
      <br />
      for real life.
    </h2>

    <p>
      We believe buying technology should be simple. That is why we focus on
      products that are useful, reliable, and built for the way you live,
      work, and play.
    </p>
  </div>

  <div className="benefits-grid">
    {benefits.map((benefit, index) => (
      <div className="benefit-card" key={benefit.title}>
        <div className="benefit-number">
          0{index + 1}
        </div>

        <div className="benefit-icon">
          {benefit.icon}
        </div>

        <h3>{benefit.title}</h3>

        <p>{benefit.description}</p>
      </div>
    ))}
  </div>
</section>


      {/* NEWSLETTER SECTION */}
<section className="newsletter-section">
  <div className="newsletter-content">
    <div>
      <p className="newsletter-eyebrow">
        STAY CONNECTED
      </p>

      <h2>
        Stay ahead of
        <br />
        technology.
      </h2>
    </div>

    <div className="newsletter-right">
      <p>
        Get updates on new products, technology trends, and exclusive offers
        delivered straight to your inbox.
      </p>

      <form className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email address"
          aria-label="Email address"
        />

        <button type="submit">
          Subscribe
          <ArrowForwardIcon />
        </button>
      </form>

      <span>
        No spam. Just technology worth knowing about.
      </span>
    </div>
  </div>
</section>

    </main>
  );
}