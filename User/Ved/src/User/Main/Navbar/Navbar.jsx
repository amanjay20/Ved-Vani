import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../Assests/logo/logo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleChange = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProfileClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "user":
        navigate("/user/profile");
        break;
      default:
        navigate("/login");
    }
  };
  return (
    <div>
      <div className="w-full z-50 text-white">
        <div>
          {/* Top Navbar */}
          <div
            className={`flex flex-row justify-between items-center p-2 md:px-24 px-5 transition-all ${
              location.pathname === "/"
                ? isScrolled
                  ? "bg-white shadow-lg fixed top-0 left-0 w-full z-20"
                  : "bg-transparent"
                : "bg-white shadow-lg"
            }`}
          >
            {/* Logo */}
            <Link to="/" className="text-2xl">
              <img src={logo} alt="Sharda Mohan" className="w-32" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-row items-center text-[15px] font-medium gap-10">
              <Link to="/" className="hover:text-black text-black">
                Home
              </Link>
              <Link to="/about" className="hover:text-black text-black">
                Pooja
              </Link>
              <Link to="/services" className="hover:text-black text-black">
                Services
              </Link>
              <Link to="/product" className="hover:text-black text-black">
                Product
              </Link>
              <Link to="/astroconsult" className="hover:text-black text-black">
                Astro Consult
              </Link>
              <Link to="/blogs" className="hover:text-black text-black">
                Blog
              </Link>
              <Link to="/testimonials" className="hover:text-black text-black">
                Testimonials
              </Link>
              <Link to="/Contactus" className="hover:text-black text-black">
                ContactUs
              </Link>
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-md hover:opacity-90 transition duration-300"
                onClick={handleProfileClick}
              >
                Login
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center text-black">
              {menu ? (
                <AiOutlineClose size={28} onClick={handleChange} />
              ) : (
                <AiOutlineMenu size={28} onClick={handleChange} />
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              menu ? "translate-x-0" : "-translate-x-full"
            } lg:hidden flex flex-col absolute bg-white text-black left-0 top-20 font-semibold text-[15px] px-8 pt-8 pb-4 gap-6 w-full h-fit transition-transform duration-300 z-50 shadow-lg`}
          >
            <Link to="/" onClick={closeMenu} className="hover:text-blue-600">
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Pooja
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Services
            </Link>
            <Link
              to="/product"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Product
            </Link>
            <Link
              to="/astroconsult"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Astro Consult
            </Link>
            <Link
              to="/blogs"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Blog
            </Link>
            <Link
              to="/testimonials"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Testimonials
            </Link>
            <Link
              to="/Contactus"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Contactus
            </Link>
            <button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md hover:opacity-90"
              onClick={handleProfileClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
