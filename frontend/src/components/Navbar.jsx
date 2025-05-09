import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="space-x-6 flex font-semibold">
        <div className="">Task Manager</div>
        <Link to="/home" className="hover:underline">
          <h1 className="">Home</h1>
        </Link>
      </div>

      <div className="flex space-x-4 font-semibold">
        <Link to="/task" className="hover:underline">
          Tasks
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
