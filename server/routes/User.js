
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/User.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

dotenv.config();

const router = express.Router();

// Register endpoint with email verification
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Checking if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Generating a verification token
  const verificationToken = uuidv4();

  try {
    // Create new user with verification token
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashpassword,
      verified: false,
      verificationToken,
    });

    // Send verification email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    // Send the verification token in the response
    return res.json({
      status: true,
      message: `Registration successful. Please verify your email. Verification token: ${newUser.verificationToken}`,
    });
  } catch (error) {
    console.error("Registration failed:", error);
    return res
      .status(500)
      .json({ status: false, message: "Registration failed." });
  }
});

// Email verification endpoint
router.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid verification token." });
    }

    // Mark user as verified and then we can Clear verification token
    user.verified = true;
    user.verificationToken = undefined; // clear
    await user.save();

    return res.json({
      status: true,
      message: "Email verification successful. You can now log in.",
    });
  } catch (error) {
    console.error("Email verification failed:", error);
    return res
      .status(500)
      .json({ status: false, message: "Email verification failed." });
  }
});

// Function to send verification email
const sendVerificationEmail = (email, token) => {
  const verificationLink = `http://localhost:5000/auth/verify-email/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME, 
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Verify your email address",
    text: `Click the following link to verify your email address: ${verificationLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending verification email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: false, message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ status: false, message: "Password is incorrect" });
  }
// the token expires in 1hr and you will have to login again after that
  const token = jwt.sign({ firstName: user.firstName }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "login successful" });
});

// forgot apssword api
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    var mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Reset your password",
      text: `http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "there was an error sending email" });
      } else {
        res.json({ status: true, message: "Email sent" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// reset password middleware
router.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashpassword });
    return res.json({ status: true, message: "updated password" });
  } catch (error) {
    return res.json("invalid token");
  }
});

// Auth Verification block
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }
};



//
router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorized" });
});





export { router as UserRouter };
export default verifyUser;

