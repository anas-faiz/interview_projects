const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const productsInputValidation = require('./utils/validators');
const PRODUCT = require('./models/products');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const port = 4000

app.post("/products", async (req,res)=>{    
    try{
        const {name ,price , category , stock} = req.body;

        productsInputValidation({name, price , category , stock});

        name = name.toLowerCase();
        category = category.toLowerCase();

        const product = new PRODUCT.create({name,price,category,stock});

        res.status(203).json({
            success: true,
            message: "product details added successfully",
            data: product
        })


    }catch(error){
        res.status(400).json({
            success: false,
            message: `internal server Error : ${error}`,
        })
    }


})




app.listen(port,()=>{
    console.log("server active on port ", port);
})
