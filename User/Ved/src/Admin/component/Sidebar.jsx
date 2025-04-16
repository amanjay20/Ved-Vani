import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom"; // Import NavLink
import { FiHome, FiShoppingBag } from "react-icons/fi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { BiCategory } from "react-icons/bi";
import { FaRegClipboard } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";

import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../User/Assests/logo/logo.png";
import logocollaps from "../../User/Assests/logo/logo.png";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="h-screen">
      {/* Hamburger Button for Mobile */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="block lg:hidden p-4 text-gray-500"
      >
        <GiHamburgerMenu className="text-2xl" />
      </button>

      <div
        className={`fixed top-0 left-0 z-50 h-full bg-gray-50 shadow-lg transform transition-transform duration-300 ${
          isMobileOpen
            ? "translate-x-0"
            : "translate-x-[-100%] lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-64"} lg:relative`}
      >
        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between p-2 md:p-6">
        <Link to="/">
          <img
            src={isCollapsed ? logocollaps : logo}
            alt="Logo"
            className={`h-10 transition-transform duration-300 ${
              isCollapsed ? "scale-75" : "scale-100"
            }`}
          />
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500"
          >
            {isCollapsed ? (
              <TbLayoutSidebarLeftExpand className="text-xl" />
            ) : (
              <TbLayoutSidebarLeftCollapse className="text-xl" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col flex-1 px-4 mt-4 space-y-2">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin"
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                activeClassName="bg-green-500 text-white"
              >
                <FiHome className="text-lg" />
                {!isCollapsed && (
                  <span className="text-sm font-semibold">Dashboard</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                activeClassName="bg-green-500 text-white"
              >
                <FiShoppingBag className="text-lg" />
                {!isCollapsed && (
                  <span className="text-sm font-semibold">Order</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/createproducts"
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                activeClassName="bg-green-500 text-white"
              >
                <FaRegClipboard className="text-lg" />
                {!isCollapsed && (
                  <span className="text-sm font-semibold">Add Products</span>
                )}
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/admin/products"
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                activeClassName="bg-green-500 text-white"
              >
                <FaRegClipboard className="text-lg" />
                {!isCollapsed && (
                  <span className="text-sm font-semibold">Products</span>
                )}
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/admin/categories"
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                activeClassName="bg-green-500 text-white"
              >
                <BiCategory className="text-lg" />
                {!isCollapsed && (
                  <span className="text-sm font-semibold">Categories</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/subcategories"
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                activeClassName="bg-green-500 text-white"
              >
                <BiCategory className="text-lg" />
                {!isCollapsed && (
                  <span className="text-sm font-semibold">Add SubCategory</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/banners"
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                activeClassName="bg-green-500 text-white"
              >
                <TfiLayoutSliderAlt className="text-lg" />
                {!isCollapsed && (
                  <span className="text-sm font-semibold">Add Banner</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/alluser"
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                activeClassName="bg-green-500 text-white"
              >
                <HiOutlineUsers className="text-lg" />
                {!isCollapsed && (
                  <span className="text-sm font-semibold">Users</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/Ingredent"
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                activeClassName="bg-green-500 text-white"
              >
                <FiShoppingBag className="text-lg" />
                {!isCollapsed && (
                  <span className="text-sm font-semibold">Ingredient</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
