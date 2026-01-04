import React, { useState } from 'react'

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const handleClick = ()=>{
        
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