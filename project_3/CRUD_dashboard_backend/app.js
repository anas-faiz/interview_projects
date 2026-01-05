const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());

const port = 4000




app.listen(port,()=>{
    console.log("server active on port ", port);
})
