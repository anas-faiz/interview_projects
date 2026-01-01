const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    longUrl: {
    type: String,
    required: true,
    },
    shortCode:{
        type: String,
        required: true,
        unique: true
    }
});

const UrlModel = mongoose.model("URL",urlSchema)

module.exports =  UrlModel