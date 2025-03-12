import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div 
      className="w-screen h-screen flex flex-col items-center justify-center bg-gray-200 overflow-hidden"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/path-to-your-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Welcome Text */}
      <h2 className="text-3xl sm:text-4xl text-white font-bold text-center">
        Welcome to Task Management
      </h2>

      {/* Subtext */}
      <p className="text-lg sm:text-xl text-gray-300 max-w-2xl text-center mt-4">
        Organize, prioritize, and track your tasks effortlessly.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-6">
        <Link 
          to="/register" 
          className="bg-blue-600 text-white px-8 py-3 text-lg sm:text-xl rounded-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
        >
          Get Started
        </Link>

        <Link 
          to="/login" 
          className="bg-gray-700 text-white px-8 py-3 text-lg sm:text-xl rounded-lg hover:bg-gray-800 transition-shadow shadow-md hover:shadow-lg"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Home;
