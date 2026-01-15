import { useState } from "react"
import axios from "axios"

const Dashboard = ()=>{
    const [ productName, setProductName ] = useState("");
    const [price,setPrice] = useState('');
    const [stock,setStock] = useState('');
    const [category,setCategory] = useState('');

    const handleSubmit = async ()=>{
        const res = await axios.post("http:localhost:3000/product/add",{
            productName,
            price,
            stock,
            category,
        })

        const data = await res.json()
    }

    return(
        <div>
            <p>Enter product </p>
            <form>
                <input value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder="product name" />
                <input value={price} onChange={(e)=>setPrice(e.target.value)}  placeholder="price" />
                <input value={stock} onChange={(e)=>setStock(e.target.value)} placeholder="stock" />
                <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="category" />                
                <button onSubmit={handleSubmit} >ADD product</button>
            </form>
        </div>
    )
}

export default Dashboard