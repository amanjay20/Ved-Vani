import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Features/auth/authSlice";

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async() => {
    // Clear authentication data (e.g., remove token or session info)
    dispatch(setUser(null));
    sessionStorage.removeItem('token'); // If you're using sessionStorage
    toast.success("Logged out successfully!");
    // Optionally, redirect user after logout (if using React Router)
    navigate('/'); // Redirect to the login page
  };
  return (
    <>
      {/* Header Section */}
      <header className="flex items-center justify-between bg-white px-4 sm:px-6 py-4 shadow-sm">
        {/* Logo or Placeholder */}
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="text-gray-600 text-2xl hover:text-gray-800 transition duration-200">
            <MdNotifications />
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <HiOutlineUserCircle className="text-2xl text-gray-500" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Admin</p>
                
              </div>
              <FiChevronDown className="text-lg" />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                {/* <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a> */}
                <hr className="border-t border-gray-200 my-1" />
                <button
                 onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <hr className="border-t border-gray-300 mx-4 sm:mx-6" />
    </>
  );
};

export default Header;
