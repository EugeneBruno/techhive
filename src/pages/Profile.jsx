import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";

import "../App.css";

function Profile() {
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
        } else {
          setUserData({
            firstName: currentUser.displayName?.split(" ")[0] || "",
            lastName: currentUser.displayName?.split(" ").slice(1).join(" ") || "",
            email: currentUser.email || "",
            phone: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Unable to load your account information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Unable to sign out. Please try again.");
    }
  };

  const fullName =
    `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim() ||
    currentUser?.displayName ||
    "TechHive User";

  const formattedDate = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString(
        "en-NG",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "Not available";

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

        {error && <p className="form-error">{error}</p>}

        <div className="profile-layout">
          <aside className="profile-sidebar">
            <div className="profile-avatar">
              <AccountCircleIcon />
            </div>

            {loading ? (
              <>
                <h2>Loading...</h2>
                <p>Please wait</p>
              </>
            ) : (
              <>
                <h2>{fullName}</h2>
                <p>{currentUser?.email}</p>
              </>
            )}

            <button
              type="button"
              className="profile-sidebar-button"
              onClick={handleLogout}
              disabled={loading}
            >
              <LogoutIcon />
              Sign Out
            </button>
          </aside>

          <section className="profile-content">
            <div className="profile-section">
              <div className="profile-section-icon">
                <AccountCircleIcon />
              </div>

              <div className="profile-section-details">
                <h2>Account Information</h2>

                {loading ? (
                  <p>Loading your account information...</p>
                ) : (
                  <div className="profile-information-grid">
                    <div>
                      <span>First Name</span>
                      <strong>{userData?.firstName || "Not provided"}</strong>
                    </div>

                    <div>
                      <span>Last Name</span>
                      <strong>{userData?.lastName || "Not provided"}</strong>
                    </div>

                    <div>
                      <span>Email Address</span>
                      <strong>{userData?.email || currentUser?.email}</strong>
                    </div>

                    <div>
                      <span>Phone Number</span>
                      <strong>{userData?.phone || "Not provided"}</strong>
                    </div>

                    <div>
                      <span>Account Created</span>
                      <strong>{formattedDate}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-icon">
                <ShoppingBagOutlinedIcon />
              </div>

              <div>
                <h2>Order History</h2>
                <p>
                  Your previous purchases and current orders will appear here
                  when the order system is connected.
                </p>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-icon">
                <LogoutIcon />
              </div>

              <div className="profile-signout-content">
                <h2>Sign Out</h2>

                <p>
                  Sign out of your TechHive account on this device.
                </p>

                <button
                  type="button"
                  className="profile-logout-button"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Profile;