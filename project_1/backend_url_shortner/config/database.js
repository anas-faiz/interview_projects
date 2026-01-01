const mongoose = require("mongoose")

const connectDb = async ()=>{
    await mongoose.connect(process.env.moongoose_url);
};

module.exports = { connectDb };