const mongoose=require('mongoose');
const studSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    Enroll_No:{
        type:String,
        required:true
    },
    Date_Of_Admission:{
        type:String,
        required:true
    }

})
const students=new mongoose.model("students",studSchema);
module.exports=students;