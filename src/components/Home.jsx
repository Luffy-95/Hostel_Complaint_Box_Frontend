import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-black-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-lg">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#2D2D2D" }}>
          Welcome to NIT Patna Hostel Complaint Portal
        </h1>
        <p className="text-gray-700 mb-6">
          This portal is designed to help you register any complaints or issues
          you may have during your stay at NIT Patna's hostels. Our aim is to
          resolve your problems quickly and efficiently to ensure a comfortable
          living experience.
        </p>
        <p className="text-gray-700 mb-6">
          Please log in to your account to submit a new complaint or to check
          the status of existing ones.
        </p>
        <Link
          to="/login"
          className="text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
