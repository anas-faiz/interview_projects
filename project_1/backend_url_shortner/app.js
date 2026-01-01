const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { nanoid } = require("nanoid");
const { connectDb } = require("./config/database")
require("dotenv").config()

const app = express();

const port = 4000

app.use(cors);

app.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;

    const shortCode = nanoid(6);

    const url = await URL.create({ longUrl, shortCode });

    res.json({
        shortCode: `https://short-url/${shortCode}`
    })

})

app.get("/:code", async (req, res) => {

    const url = await URL.findOne({ shortCode: req.params.code });

    if (!url) return res.status(401).json({ "message": "not found" });

    res.redirect(URL.longUrl);

});


connectDb().then(
    () => {
        console.log("database connected");
        app.listen(port, () => {
            console.log("server running on " + port)
        })

    }
).catch((err)=>{
    console.log("database not connected")
})

