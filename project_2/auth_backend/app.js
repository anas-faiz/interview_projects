const express= require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./config/database");
require("dotenv").config();

const app = express();

app.use(express.json);

const port = 4000;

connectDB()
.then(()=>{
     console.log("database connected")
    app.listen(port,()=>{
      console.log("server running on " + port);
    })  
}).catch((error)=>{
  console.log("error connecting the database " + error)
})







