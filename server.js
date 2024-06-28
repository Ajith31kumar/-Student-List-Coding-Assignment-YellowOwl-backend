const express= require('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv');
var cors= require('cors');
const app=express();




//Add Schema 
const students=require("./models/studSchema")

//Add Router
const router=require("./routes/router");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(router);

mongoose.connect(process.env.Database).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log("Error")
})

const PORT = 6000;
app.listen(PORT,()=>{
    console.log(`server start at ${PORT}`);
})


