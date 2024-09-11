const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postroutes = require("./routes/Posts");
const categoryroutes = require("./routes/Categories")
const cors = require("cors");



const port = process.env.PORT || 8000 ;
const app= express();

//Middleware
app.use(bodyParser.json());
app.use(cors());


//connecting to db
mongoose.connect('mongodb://localhost:27017/blog')
.then(() =>{
    console.log("connected to db")
})
.catch(err => {
    console.log(err)
})

app.use('/api/posts', postroutes)
app.use('/api/categories', categoryroutes)


app.listen(port ,() => console.log(`connected to the port ${port}`))
