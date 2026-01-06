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

        name = name.trim().toLowerCase();
        category = category.trim().toLowerCase();

        const product = await PRODUCT.create({
            name,
            price,
            category,
            stock
        });

        res.status(203).json({
            sucess: true,
            message: "product details added successfully",
            data: product
        })

    }catch(error){
        res.status(404).json({
            sucess: false,
            message: `internal server Error : ${error}`,
        })
    }
})


app.get("/products", async (req, res) => {
  try {
    const data = await PRODUCT.find();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});



app.listen(port,()=>{
    console.log("server active on port ", port);
})
