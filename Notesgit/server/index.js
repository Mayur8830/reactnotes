const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')

require('dotenv').config({path:"./config.env"});
require('./db/conn')
const notes = require("./routes/Notes");
const user = require("./routes/User");

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(cors());

app.use("/api/v1",user);
app.use("/api/v1",notes);




app.listen(process.env.PORT,() => {
    console.log("App is Running on Port : ",process.env.PORT);
})