import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import "../App.css";

function Profile() {
  return (
    <main className="profile-page">
      <Link
        to="/"
        className="floating-back-button"
        aria-label="Back to home"
      >
        <ArrowBackIcon />
        <span>Back to Home</span>
      </Link>

      <div className="profile-container">
        <div className="profile-header">
          <p className="page-eyebrow">My Account</p>

          <h1>Your profile.</h1>

          <p>
            Manage your account details and review your TechHive activity.
          </p>
        </div>

        <div className="profile-layout">
          <aside className="profile-sidebar">
            <div className="profile-avatar">
              <AccountCircleIcon />
            </div>

            <h2>Guest User</h2>
            <p>Not signed in</p>

            <Link to="/login" className="profile-sidebar-button">
              Sign In
            </Link>
          </aside>

          <section className="profile-content">
            <div className="profile-section">
              <div className="profile-section-icon">
                <AccountCircleIcon />
              </div>

              <div>
                <h2>Account Information</h2>
                <p>
                  Your personal account details will appear here after you
                  sign in.
                </p>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-icon">
                <ShoppingBagOutlinedIcon />
              </div>

              <div>
                <h2>Order History</h2>
                <p>
                  View your previous purchases and track current orders from
                  your account.
                </p>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-icon">
                <LogoutIcon />
              </div>

              <div>
                <h2>Sign Out</h2>
                <p>
                  The sign-out option will become available once Firebase
                  authentication is connected.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Profile;