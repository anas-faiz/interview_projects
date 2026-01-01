const express = require("express");
const { SignUp } = require("./models/auth");

const app = express();

app.use(express.json());


app.post("/signup", async( req,res )=>{
    const { name, email, password} = req.body;

    const isEmailPresent = await SignUp.findOne({email});

    if(isEmailPresent) return res.json({"message" : "Email already signed Up"})

    if(password.length() < 6) return res.json({"message" : "Password length should be more 6"});

    const user = await SignUp.create({ name,email,password })

    res.status(200).json({
        "message" : "User regeistered succesfully",
        "data": user
    })
})