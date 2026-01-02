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

module.exports = {SignUpValidator}