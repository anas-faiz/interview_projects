const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./config/database");
require("dotenv").config();
const { SignUpValidator, loginValidator } = require("./utils/validator");
const USER = require("./models/user");

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

app.post("/login" , async(req,res)=>{
  try{

    const{email,password} = req.body;
    
    loginValidator({email,password})

    const user = await USER.findOne({email: email.trim().toLowerCase()});

    if(!user) throw new Error("enter a valid Email");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid)  throw new Error ("invalid password");

    const token = await jwt.sign({_id:user._id,email:user.email},process.env.jwt_secret,{expiresIn: "1d"});

    res.cookie("token", token , {
      expires: 60*60*1000,
    })
    
    res.json({
      sucess: true,
      message:"logged in successfully",
      data:{
        _id: user._id,
        name:user.name,
        email:user.email
      }
    })

  }catch(error){
    res.json({
      sucess: false,
      message: error.message
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







