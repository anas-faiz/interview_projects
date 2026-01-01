const mongoose = require("moongoose");

const urlSchema = new mongoose.Schema({
    longUrl: {
    type: String,
    required: true,
    },
    shortUrl:{
        type: String,
        required: true,
        unique: true
    }
});

const UrlModel = mongoose.model("URL",urlSchema)

export default UrlModel