const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    stock:{
        type: Number,
        required: true,
        min: 0
    },
    status:{
        type: String,
        enum:["active","inactive"],
        default: "active"
    }
},{
    timeStamps: true
})

const PRODUCT = mongoose.model("PRODUCT",productsSchema)

module.exports = PRODUCT;