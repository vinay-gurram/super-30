const express= require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js'); 
const dotenv=require('dotenv');

dotenv.config()
const app= express();
app.use(express.json());

mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Database is linked successfully 👍🏻")
})
.catch((err)=>{
    console.log("Database is not linked: ", err)
})

app.use("/api",authRoutes)

app.listen(5010,()=>{
    console.log("Server is running successfully at port 5010")
})