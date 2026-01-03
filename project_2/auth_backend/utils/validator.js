const z = require("zod")

function SignUpValidator({name,email,password}){

    if(!name.trim() || !email.trim() || !password){
        throw new Error ("please enter all the require details")
    }
    if(!z.email){
        throw new Error ("please enter a valid email");
    }

    if(!z.password || password.length < 6){
        throw new Error ("please enter a valid password")
    }

}

module.exports = {SignUpValidator}