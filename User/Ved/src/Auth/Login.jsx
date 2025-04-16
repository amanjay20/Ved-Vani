import React, { useState } from "react";
import logo from "../User/Assests/logo/logo.png";
import login1 from "../User/Assests/auth/login1.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/Features/auth/authSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaApple, FaFacebook } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rememberMe) {
      return;
    }
    console.log(formData, "formadata");
    try {
      const response = await axios.post(`/api/user/login`, formData);
      if (response?.data) {
        // dispatch(hideLoading());
        sessionStorage.setItem("token", response?.data.token);
        const user = response?.data?.user;
        console.log(user);
        dispatch(setUser(user));
        toast.success("Login Successfully", {
          position: "bottom-right",
          autoClose: 1000,
        });
        if (user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Login Failed. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }
  };
  return (
    // <GoogleOAuthProvider clientId={clientId}>
    <div className="max-w-7xl mx-auto">
      {/* Logo */}
      <div className="flex pt-10 px-6 lg:px-0">
        <div className="relative h-14 w-40">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-24 md:w-32 h-auto max-w-full"
            />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 xl:p-0 p-6">
        {/* Left Side - Form */}
        <div className="my-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 lg:mt-16">
            Login
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Login to access your account.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Email Field */}
            <div>
              <h3 className="text-sm text-gray-800 font-medium">Email</h3>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border border-gray-400 outline-none p-2.5 rounded-lg w-full mt-1.5 focus:border-green-500"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <h3 className="text-sm text-gray-800 font-medium">Password</h3>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border border-gray-400 outline-none p-2.5 rounded-lg w-full mt-1.5 focus:border-green-500"
                required
              />
              <div
                className="absolute inset-y-0 right-3 top-7 flex items-center cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-end text-sm">
              <label
                className="flex items-center gap-2 font-medium cursor-pointer"
                style={{ display: "none" }}
              >
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="focus:ring-green-500"
                  required
                />
                Remember me
              </label>
              <a href="/forget" className="text-red-500 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center p-2 text-sm font-medium rounded-md bg-[#D5AC88] text-white hover:bg-[#006DB0] transition"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-gray-800 text-sm font-semibold text-center my-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#D5AC88]">
              Sign Up
            </Link>
          </div>

          {/* Social Login Section */}
          <div className="flex items-center w-full text-sm text-gray-600 my-10">
            <div className="h-[0.5px] w-full bg-gray-400"></div>
            <span className="md:w-72 w-52 text-center">or Sign Up with</span>
            <div className="h-[0.5px] w-full bg-gray-400"></div>
          </div>

          {/* Social Login Buttons */}
          {/* <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-2">
                        <button className="text-blue-500 border-2 border-green-500 w-full px-8 md:px-20 py-2 rounded-lg flex items-center justify-center">
                            <FaFacebook className="w-6 h-auto" />
                        </button>
                        <button className="border-2 border-green-500 w-full px-8 md:px-20 py-2 rounded-lg flex items-center justify-center">
                            <FcGoogle className="w-6 h-auto" />
                        </button>
                        <button className="border-2 border-green-500 w-full px-8 md:px-20 py-2 rounded-lg flex items-center justify-center">
                            <FaApple className="w-6 h-auto" />
                        </button>
                    </div> */}
          <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-2">
            <div className=" w-full px-8 md:px-20 py-2 rounded-lg flex items-center justify-center">
              {/* <GoogleLogin
                  clientId="71080667245-9os5m1rv5rnv90tqpd15gcqvetbk0e5k.apps.googleusercontent.com"
                  text="continue_with"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                /> */}
            </div>
          </div>
        </div>

        {/* Right Side - Swiper Image Section */}
        <div className="w-full sticky top-0 max-md:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className="mySwiper h-full mx-auto"
          >
            <SwiperSlide className="relative h-full w-full bg-gray-300 rounded-3xl">
              <img
                src={logo}
                alt="Login Illustration"
                className="w-full h-auto object-contain rounded-3xl"
              />
            </SwiperSlide>
            <SwiperSlide className="relative h-full w-full bg-gray-300 rounded-3xl">
              <img
                src={login1}
                alt="Login Illustration"
                className="w-full h-auto object-contain rounded-3xl"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
    // </GoogleOAuthProvider>
  );
};

export default Login;
