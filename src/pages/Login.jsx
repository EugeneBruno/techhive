import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import VisibilityIcon from "@mui/icons-material/Visibility";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../firebase/firebaseConfig";

import { doc, getDoc } from "firebase/firestore";

import "../App.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const destination = location.state?.from || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      const user = userCredential.user;

      // Check the user's role in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      let userRole = "customer";

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        userRole = userData.role || "customer";
      }

      // Admins always go to the admin dashboard
      if (userRole === "admin") {
        navigate("/admin", { replace: true });
        return;
      }

      // Normal users return to the page they originally requested
      navigate(destination, { replace: true });
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many unsuccessful attempts. Please try again later."
          );
          break;

        default:
          setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
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

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}

              {!loading && <ArrowForwardIcon />}
            </button>
          </form>

          <p className="auth-switch-text">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={{ from: destination }}
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;