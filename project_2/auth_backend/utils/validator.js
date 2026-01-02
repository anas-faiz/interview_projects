const z = require("zod");

const SignUpValidator = (req)=>{

    const { name ,email,password } = req.body;

    if(!name || !email || !password) {
        throw new Error("enter all fields");
    }
    else if(!z.email){
        throw new Error ("enter a valid email")
    }
    else if(!z.password){
        throw new Error("enter a valid password")
    }
}

const LoginValidator = (req)=>{

    const { email , password} =req.body;

    if(!email || !password ) throw new Error("enter all required details");

    if(!z.email) throw new Error ("enter a valid Email");

}

module.exports = {SignUpValidator, LoginValidator}