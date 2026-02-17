import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only send over HTTPS in prod
        sameSite: "none", // or "none" if cross-site
        path: "/",
      })
      .cookie("isLoggedIn", "true", {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
      })
      .status(201)
      .json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only send over HTTPS in prod
        sameSite: "none", // or "none" if cross-site
        path: "/",
      })
      .cookie("isLoggedIn", "true", {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
      })
      .status(201)
      .json({ message: "User loogedin successfully" });
  } catch (err) {
    res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
};

const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in prod
      sameSite: "none", // or "none" if cross-site
      path: "/", // Ensure it's cleared for the entire domain
    })
    .clearCookie("isLoggedIn")
    .status(200)
    .json({ message: "User logged out successfully" });
};

export { signup, login, logout };
