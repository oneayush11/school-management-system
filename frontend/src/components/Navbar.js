import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardLink =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "teacher"
      ? "/teacher"
      : "/student";

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🏫 School Management System
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to={dashboardLink}>Dashboard</Link>
            <span className="navbar-user">
              {user.name} ({user.role})
            </span>
            <button onClick={handleLogout} className="btn-link">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
