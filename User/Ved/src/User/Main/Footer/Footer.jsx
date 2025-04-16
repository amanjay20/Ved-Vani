import React from "react";
import { Link } from "react-scroll";
import logo from "../../Assests/logo/logo.png"; // Ensure the path is correct

const Footer = () => {
  return (
    <div className="  bg-[url('assets/images/footer.png')] bg-no-repeat bg-cover text-black rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4 ">
            <div className=" cursor-pointer">
                <Link to="/" className="text-2xl ">
                  <img src={logo} alt="Sharda Mohan " className="w-40 rounded-lg"/>
                </Link>
              </div>
          <p className=" text-sm pt-4">
          To promote wellness and balance by combining traditional homeopathy with modern expertise, helping individuals achieve lasting health naturally.
          </p>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Quik Links</h1>
          <nav className=" flex flex-col gap-2">
            <Link
              to="/about"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              About Us
            </Link>
            <Link
              to="/services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Services
            </Link>
            <Link
              to="gallery"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Gallery
            </Link>
            <Link
              to="/blogs"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
            Blogs
            </Link>
          </nav>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Services</h1>
          <nav className=" flex flex-col gap-2">
            <Link
              to="/services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Chronic Disease Management
            </Link>
            <Link
              to="/services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
            Skin & Hair Care Solutions
            </Link>
            <Link
              to="/services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Allergy & Immunity Boosting
            </Link>
            <Link
              to="/services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Pediatric Homeopathy
            </Link>
            <Link
              to="/services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
             Stress & Emotional Well-Being
            </Link>
            <Link
              to="/services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Women’s Health Care
            </Link>
          </nav>
        </div>
        <div className=" w-full md:w-1/4">
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <Link to="/" spy={true} smooth={true} duration={500}>
            G-3, Vikram Appt, 91, Chandralok Colony, Saket, Indore, Madhya Pradesh 452009
            </Link>
            {/* <Link to="/" spy={true} smooth={true} duration={500}>
              support@care.com
            </Link> */}
            <Link to="/" spy={true} smooth={true} duration={500}>
              +9198260 56610
            </Link>
          </nav>
        </div>
      </div>
      <div>
        <p className=" text-center py-4">
          @copyright developed by
          <span className=" text-black"> Binarylogix Technologies LLP</span> | All
          rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
