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
        <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='password.' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={handleClick} >click</button>
    </div>
  )
}

export default Login