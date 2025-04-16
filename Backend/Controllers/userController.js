import User from "../Models/userModel.js";
import catchAsyncError from "../Middlewares/catchAsyncError.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (user) => {
  const payload = { _id: user._id, email: user.email, role: user.role };
  // console.log("🔑 Generating Token for:", payload);

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export const loginOrSignup = catchAsyncError(async (req, res) => {
  console.log(req.body);
  try {
    const { sub, fullName, email, password, phoneNumber } = req.body;

    // Log request body for debugging purposes
    // console.log(req.body, "Request Body");

    // Check if it's a Google login/signup (sub is present in the body)
    if (sub) {
      // Google login or signup logic
      let user = await User.findOne({ email });
      // console.log(user, "user");

      // If user exists, return token and success response for Google login
      if (user) {
        // If user already exists, return an error response
        return res.status(400).json({
          success: false,
          message: "User already registered. Please sign in.",
        });
      }

       // Determine role based on whether this is the first user
       const isFirstUser = (await User.countDocuments()) === 0;
       const role = isFirstUser ? "admin" : "user";

      // If the user doesn't exist, create a new user for Google signup
      user = new User({
        fullName,
        email,
        phoneNumber: "",
        sub, // Use Google 'sub' field as user identifier
        verified: true, // Automatically verified as it's from Google
        role, // Assign role
      });

      await user.save();
      const token = generateToken(user);

      return res.status(201).json({
        success: true,
        message: "Google account created and login successful",
        user,
        token,
      });
    }

    // Standard signup logic (for non-Google users)
    // Check if essential fields are present for standard signup

    if (!fullName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message:
          "First name, last name, email, password, and phone number are required for signup.",
      });
    }

    // Check if user already exists by email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Check if user already exists by phonenumber
    let existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number already registered" });
    }

    // Check if user already exists by username
    //   let existingUsername = await User.findOne({ username });
    //   if (existingUsername) {
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "Username already taken" });
    //   }

    
    // Determine role based on whether this is the first user
    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? "admin" : "user";

    // Create a new user for standard signup
    user = new User({
      fullName,
      email,
      phoneNumber,
      password,
      verified: true, // Set 'verified' to true or false based on your requirements
      role, // Assign role
    });

    await user.save();
    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error during login or signup:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred, please try again later.",
    });
  }
});


// Login function
export const login = catchAsyncError(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email not Found. Please signup" });
    }
  
    const isMatch = await user.comparePassword(password);
  
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password " });
    }
  
    const token = generateToken(user);
  
    // res.cookie('token', token);
    res.status(200).json({ message: "Login successful", token, user });
  });


  export const LoginUser = catchAsyncError(async (req, res) => {
    const { _id } = req.user;
  
    const user = await User.findOne({ _id }).lean(); // Use .lean() to get a plain JavaScript object
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    // Remove the password field
    delete user.password;
  
    res.status(200).json({ message: "Login successful", user });
  });