const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();

const port = 4000

app.use(cors);

app.post("/shorten", async (req,res)=>{
    const { longUrl }  =req.body;

    const shortCode = nanoid(6);

    const url = await URL.create({longUrl,shortCode});

    res.json({
        shortCode: `https://short-url/${shortCode}`
    })

})



app.listen(port,()=>{
    console.log("server running on " + port)
})


