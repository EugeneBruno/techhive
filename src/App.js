import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";

import { CartProvider } from "./context/CartContext";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

import { Box } from "@mui/material";

import AdminRoute from "./components/AdminRoute";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import Admin from "./pages/Admin";

import AdminProducts from "./pages/AdminProducts";

import AdminOrders from "./pages/AdminOrders";

import AddProduct from "./pages/AddProduct";

import EditProduct from "./pages/EditProduct";

import Home from "./pages/Home";

import Products from "./pages/Products";

import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";

import Checkout from "./pages/Checkout";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Profile from "./pages/Profile";


function ScrollToTop() {
  const { pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return (
      <Navigate
        to="/register"
        state={{
          from: location.pathname + location.search,
        }}
        replace
      />
    );
  }

  return children;
}


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />

          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar />

            <Box
              component="main"
              sx={{ flexGrow: 1 }}
            >
              <Routes>

                {/* Storefront */}
                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="/products"
                  element={<Products />}
                />

                <Route
                  path="/products/:id"
                  element={<ProductDetails />}
                />

                <Route
                  path="/cart"
                  element={<Cart />}
                />


                {/* Protected Checkout */}
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />


                {/* Authentication */}
                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route
                  path="/register"
                  element={<Register />}
                />


                {/* Protected Customer Profile */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />


                {/* Admin Dashboard */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  }
                />

                {/* Admin Products */}
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <AdminProducts />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/products/new"
                  element={
                    <AdminRoute>
                      <AddProduct />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/products/edit/:id"
                  element={
                    <AdminRoute>
                      <EditProduct />
                    </AdminRoute>
                  }
                />

                {/* Admin Orders */}
                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoute>
                      <AdminOrders />
                    </AdminRoute>
                  }
                />

              </Routes>
            </Box>

            <Footer />
          </Box>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;