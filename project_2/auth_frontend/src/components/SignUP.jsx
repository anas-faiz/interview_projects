import React, { useState } from 'react'

const SignUP = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleClick = ()=>{
        
    }

  return (
    <div>
        <input value={name} onChange={(e)=>setName(e.target.value)} />
        <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleClick} >click</button>
    </div>
  )
}

export default SignUP