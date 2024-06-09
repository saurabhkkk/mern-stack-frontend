import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-blue-200 hover:text-blue-900"
      }`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
