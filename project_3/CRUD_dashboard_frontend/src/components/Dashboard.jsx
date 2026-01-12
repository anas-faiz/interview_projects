import { useState } from "react"

const Dashboard = ()=>{
    const [ productName, setProductName ] = useState("");
    const [price,setPrice] = useState('');
    const [stock,setStock] = useState('');
    const [category,setCategory] = useState('');

    return(
        <div>
            <p>Enter product </p>
            <form>
                <input value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder="product name" />
                <input value={price} onChange={(e)=>setPrice(e.target.value)}  placeholder="price" />
                <input value={stock} onChange={(e)=>setStock(e.target.value)} placeholder="stock" />
                <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="category" />                
            </form>
        </div>
    )
}

export default Dashboard