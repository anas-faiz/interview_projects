const express = require("express");
const cors = require("cors");
const URL = require("./models/url")
const { nanoid } = require("nanoid");
const { connectDb } = require("./config/database")
require("dotenv").config()

const app = express();

const port = 4000

app.use(express.json())
app.use(cors());

app.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;

    const shortCode = nanoid(6);

    await URL.create({ longUrl, shortCode });

    res.json({
        shortCode: `http://localhost:4000/${shortCode}`
    })

})

app.get("/:code", async (req, res) => {

    const url = await URL.findOne({ shortCode: req.params.code });

    if (!url) return res.status(404).json({ "message": "not found" });

    res.redirect(url.longUrl);

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

