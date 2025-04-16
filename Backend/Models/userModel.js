import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema, model } = mongoose;

// Define the schema for addresses
const addressSchema = new Schema({

  lastname: String,
  firstname: String,
  mobile: String,
  email: String,
  pincode: String,
  city: String,
  street: String,
  zip: String,
  address: String,
  state: String,
});

// Define the schema for users
const userSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    fullName: {
      type: String,
      required:true,
    
    },
    // lastName: {
    //   type: String,
    
    // },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required:true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: [true, "Role is required."],
    },
    cartItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "CartItem",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    addresses: [addressSchema],
    phoneNumber: { type: String, unique: false },

    otp: { type: String, required: false },
    otpExpiry: { type: Date, required: false },
    sub: { type: String, required: false },
    verified: { type: Boolean, required: true, default: false },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model
const User = model("User", userSchema);

// Export the User model
export default User;
