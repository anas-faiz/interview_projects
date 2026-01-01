const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    name: {
        type: string,
        required: true
    },
    email: {
        type:string,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,        
    }
})

const SignUp = new mongoose.model("SignUp",signupSchema);

module.exports = {SignUp};