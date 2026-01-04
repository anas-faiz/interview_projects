import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const handleClick = async ()=>{
        const data = await axios.post("http://localhost:4000/login",
            {email,password},
            {withCredentials: true})
    }

    return (
    <div>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={handleClick} >click</button>
    </div>
  )
}

export default Login