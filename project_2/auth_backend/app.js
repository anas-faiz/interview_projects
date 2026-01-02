const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { SignUp } = require("./models/auth");
const { SignUpValidator, LoginValidator } = require("./utils/validator");

const app = express();

app.use(express.json());
// signup
app.post("/signup", async (req, res) => {
  try {
    // 1️⃣ Validate input (must throw or return error internally)
    SignUpValidator(req);

    let { name, email, password } = req.body;

    // 2️⃣ Normalize inputs
    name = name.trim();
    email = email.trim().toLowerCase();

    // 3️⃣ Check existing user
    const isEmailPresent = await SignUp.findOne({ email });
    if (isEmailPresent) {
      return res.status(409).json({ message: "Email already signed up" });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const user = await SignUp.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6️⃣ Generate JWT
    const token = await user.getJWT();

    // 7️⃣ Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // 8️⃣ Safe response
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return res.status(201).json({
      message: "User registered successfully",
      data: safeUser,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    // 1️⃣ Validate input (must throw on failure)
    LoginValidator(req);

    let { email, password } = req.body;

    // 2️⃣ Normalize email
    email = email.trim().toLowerCase();

    // 3️⃣ Find user
    const user = await SignUp.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 4️⃣ Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 5️⃣ Generate JWT
    const token = await user.getJWT();

    // 6️⃣ Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // 7️⃣ Safe response
    const safeUser = {
      id: user._id,
      email: user.email,
    };

    return res.status(200).json({
      message: "Login successful",
      data: safeUser,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
