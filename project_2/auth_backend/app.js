const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./config/database");
require("dotenv").config();
const { SignUpValidator } = require("./utils/validator")

const port = 4000;

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {

  try {
    const { name, email, password } = req.body;

    SignUpValidator({ name, email, password });

    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = await USER.findOne({ email: normalizedEmail });

    if (existingUser) throw new Error("user already exist");

    const hashPassword = await bcrypt.hash(password, 10)

    //creating a new instance in DB

    const user = await USER.create({
      name,
      email: normalizedEmail,
      password: hashPassword,
    });

    const token = await jwt.sign({ _id: user._id, email: user.email }, process.env.jwt_secret, { expiresIn: "1h" });

    res.cookie("token", token, {
      expires: 60 * 60 * 1000,
    })

    res.json({
      success: true,
      message: "user created Successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }
})







connectDB()
  .then(() => {
    console.log("database connected")
    app.listen(port, () => {
      console.log("server running on " + port);
    })
  }).catch((error) => {
    console.log("error connecting the database " + error)
  })







