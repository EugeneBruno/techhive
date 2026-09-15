import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../App.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="auth-page">
      <Link
        to="/"
        className="floating-back-button"
        aria-label="Back to home"
      >
        <ArrowBackIcon />
        <span>Back to Home</span>
      </Link>

      <div className="auth-container">
        <div className="auth-intro">
          <p className="page-eyebrow">Join TechHive</p>

          <h1>Create your account.</h1>

          <p>
            Create an account to manage your orders and enjoy a more
            convenient shopping experience.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-card-heading">
            <h2>Register</h2>
            <p>Fill in your details to get started.</p>
          </div>

          <form className="auth-form">
            <div className="auth-form-grid">
              <div className="auth-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="08012345678"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-button">
              Create Account
              <ArrowForwardIcon />
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;