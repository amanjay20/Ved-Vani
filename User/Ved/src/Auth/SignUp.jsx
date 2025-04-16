/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import logo from "../User/Assests/logo/logo.png";

// import Signup1 from '../User/Assests/auth/signup1.jpg'
import { FaApple, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/Features/alertSlice";
import { toast } from "react-toastify";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName:"",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    sub: "",
    agreeToTerms: false,
  });
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // const clientId =
  // "71080667245-9os5m1rv5rnv90tqpd15gcqvetbk0e5k.apps.googleusercontent.com";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    // Reset error if passwords match
    setError("");

    // Data submission to API
    try {
      dispatch(showLoading());
      const response = await axios.post(`/api/user/sign-up`, formData);
      console.log("API Response:", response.data);
    
      toast.success("Account created successfully!");
      navigate('/');
     
    } catch (error) {
      dispatch(hideLoading());
      if(error.response && error.response.data.message){
        toast.error(error.response.data.message)
      }else{
        console.error("API Error:", error);
        toast.error("Failed to create an account. Please try again.");
    
      }
       }
  };

  // const responseGoogle = async (response) => {
  //   try {
  //     console.log("Google Response:", response);
  
  //     // Decoding the JWT token from response.credential
  //     const decoded = jwtDecode(response.credential);
  //     console.log(decoded, "Here is decoded");
  
  //     if (decoded) {
  //       // Directly prepare the formData to be sent
  //       const userData = {
  //         username: decoded.name || "",
  //         firstName: decoded.given_name || "",
  //         lastName: decoded.family_name || "",
  //         email: decoded.email || "",
  //         sub: decoded.sub || "",
  //         phoneNumber: ""
  //       };
  
  //       // Make the API call to sign-up the user
  //       const apiResponse = await axios.post("/api/user/sign-up", userData);
  
  //       console.log("API Response:", apiResponse.data);
  
  //       // Show success message
  //       toast.success("Account created successfully!");
  
  //       // Optionally, navigate to a different page after successful submission
  //       navigate("/login");
  
  //       // If needed, you can store the user info in sessionStorage or dispatch actions
  //       // sessionStorage.setItem("user", JSON.stringify(decoded));
  //       // sessionStorage.setItem("token", decoded.sub);  // Storing token
  
  //       // Example of dispatching user data if you're using Redux:
  //       // dispatch(setUser(userData));
  
  //     }
  //   } catch (error) {
  //     console.error("Error decoding JWT:", error?.response?.data?.message);
  //     if(!error.status === 400){
  //       toast.error("error in signup, please try again");
  //     }
  //     toast.error( error?.response?.data?.message);
  //     navigate('/login')
  //     }
  // };

  return (
    <div className="max-w-7xl mx-auto  lg:p-10">
      
      <div className="grid md:grid-cols-2 gap-10 xl:p-0 p-6">

      <div className="w-full sticky top-0 max-md:hidden rounded-3xl">
          <img
            src={logo}
            alt="Signup Illustration"
            className="w-full h-[950px] object-contain max-w-full rounded-3xl"
          />
        </div>


        {/* Right Side - Form Section */}
        <div className="lg:my-3">
          {/* Logo */}
          <div className="flex pt-6 lg:px-0">
            <div className="relative h-14 w-40">
              <Link to="/">
                <img src={logo} alt="Logo" className="w-24 md:w-32 h-auto max-w-full" />
              </Link>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 lg:mt-16 text-left">
            Sign Up
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-left">
            Let’s get you all set up so you can access your account.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="fullName"
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                required
              />
              </div>

           

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
              />
            </div>

            {/* Password Fields */}
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer mt-1"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer mt-1"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Terms & Conditions */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="focus:ring-blue-500"
                required
              />
              <label className="text-sm text-gray-600 font-medium">
                I agree to the{" "}
                <span className="text-[#FF8682]">Terms</span> and{" "}
                <span className="text-[#FF8682]">Privacy Policies</span>.
              </label>
            </div>

            {/* Submit Button */}
            <button className="w-full flex justify-center items-center p-2 text-sm font-medium rounded-lg bg-[#D5AC88] hover:bg-[#006DB0] text-black cursor-pointer">
              Create Account
            </button>
          </form>

          {/* Already have an account? */}
          <div className="text-[#313131] text-sm font-semibold text-center my-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#FF8682]">
              Login
            </Link>
          </div>

          {/* Social Sign-Up */}
          {/* <div className="flex items-center w-full text-sm text-[#313131]/70 my-10">
            <div className="h-[0.5px] w-full bg-[#313131]/70"></div>
            <span className="md:w-72 w-52 text-center">or Sign Up with</span>
            <div className="h-[0.5px] w-full bg-[#313131]/70"></div>
          </div> */}

          {/* <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-2">
            <button className="text-blue-500 border-2 border-[#625D60] px-8 md:px-20 py-2 rounded-lg flex items-center justify-center">
              <FaFacebook className="w-6 h-auto" />
            </button>
            <button className="border-2 border-[#625D60] px-8 md:px-20 py-2 rounded-lg flex items-center justify-center">
              <FcGoogle className="w-6 h-auto" />
            </button>
            <button className="border-2 border-[#625D60] px-8 md:px-20 py-2 rounded-lg flex items-center justify-center">
              <FaApple className="w-6 h-auto" />
            </button>
          </div> */}


{/* <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-2">
            
            <button className="px-8 md:px-20 py-2 rounded-lg flex items-center justify-center">
            <GoogleLogin
                  clientId="71080667245-9os5m1rv5rnv90tqpd15gcqvetbk0e5k.apps.googleusercontent.com"
                  text="continue_with"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
            </button>
           
          </div>
         */}
        </div>



      </div>
    </div>
  );
};

export default SignUp;
