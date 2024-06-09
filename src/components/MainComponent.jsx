import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavLink from "./NavLink";
import ItemList from "./ItemList";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import Login from "./Login";
import Register from "./Register";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MainComponent() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    const logoutSuccess = await logout();
    console.log(logoutSuccess);
    if (logoutSuccess) {
      toast.success("Logout successful");
      navigate("/login");
    } else {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center"></div>
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              {isAuthenticated ? (
                <>
                  <NavLink to="/">Items</NavLink>
                  <NavLink to="/add">Add Item</NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/register">Register</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <ItemList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/add"
          element={
            isAuthenticated ? <AddItem /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/edit/:id"
          element={
            isAuthenticated ? <EditItem /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default MainComponent;
