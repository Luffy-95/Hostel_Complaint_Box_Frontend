import React, { useEffect, useState } from "react";
import nitpLogo from "../resources/nitp logo.png";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../Utils/Utilities";
import { ToastContainer } from "react-toastify";

function Nav({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [flag, setFlag] = useState("Login");

  useEffect(() => {
    if (isAuthenticated) {
      setFlag("Logout");
    } else {
      setFlag("Login");
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("userName");
      localStorage.removeItem("user");

      handleSuccess("User Logged Out");

      setIsAuthenticated(false);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      handleError("Please Login");
    }
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav
        className="border-gray-200 px-4 lg:px-6 py-2.5"
        style={{ backgroundColor: "#2D2D2D" }}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src={nitpLogo} className="mr-3 h-12" alt="Logo" />
            <h1 className="text-white font-bold text-lg">
              National Institute of Technology Patna Hostel Complaint Register
              Portal
            </h1>
          </Link>
          {location.pathname !== "/signUp" && location.pathname !== "/" && location.pathname !== "/login" ? (
            <div className="flex items-center lg:order-2">
              <button
                onClick={handleLogout}
                className="text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                {isAuthenticated ? "Logout" : "Login"}
              </button>
            </div>
          ) : null}
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
}

export default Nav;
