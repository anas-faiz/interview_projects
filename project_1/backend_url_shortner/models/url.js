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

const urlModel = mongoose.model("url",urlSchema)

export default urlModel