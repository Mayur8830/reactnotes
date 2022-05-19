const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')

require('dotenv').config({path:"./config.env"});
require('./db/conn')
app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(require("./routes/Notes"));
app.use(require("./routes/User"));



app.listen(process.env.PORT,() => {
    console.log("App is Running on Port : ",process.env.PORT);
})