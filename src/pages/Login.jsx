import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../App.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

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
          <p className="page-eyebrow">Welcome Back</p>

          <h1>Sign in to TechHive.</h1>

          <p>
            Access your account, manage your orders, and continue exploring
            carefully selected technology.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-card-heading">
            <h2>Login</h2>
            <p>Enter your details to continue.</p>
          </div>

          <form className="auth-form">
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
              <div className="auth-label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            <button type="submit" className="auth-submit-button">
              Sign In
              <ArrowForwardIcon />
            </button>
          </form>

          <p className="auth-switch-text">
            Don't have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;