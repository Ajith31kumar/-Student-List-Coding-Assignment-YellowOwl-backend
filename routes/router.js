const express= require('express');
const router=express.Router();
const students= require("../models/studSchema");



router.post("/addstud",async (req, res, )=>{
    console.log(req.body)

    const {Name,Email,Phone,Enroll_No,Date_Of_Admission}=req.body;
    if(!Name || !Email|| !Phone|| !Enroll_No || !Date_Of_Admission){
        res.status(404).json("please fill the data")
    }

    try {
        const prestud=await students.findOne({Phone:Phone});
        if(prestud){
            res.status(404).json("This student has already exist")
        }else{
            const addstudent=new students({Name,Email,Phone,Enroll_No,Date_Of_Admission});
            await addstudent.save();
            res.status(201).json(addstudent);
        }

        
    } catch (err) {
        res.status(404).json(err)
    }
    
});
router.get("/getallstud", async (req, res) => {
    try {
        const allStudents = await students.find();
        return res.status(200).json(allStudents);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err });
    }
});

router.put("/updatestud/:id", async (req, res) => {
    const { id } = req.params;
    const { Name, Email, Phone, Enroll_No, Date_Of_Admission } = req.body;

    if (!Name || !Email || !Phone || !Enroll_No || !Date_Of_Admission) {
        return res.status(400).json({ message: "Please fill all the data" });
    }

    try {
        const updatedStudent = await students.findByIdAndUpdate(
            id,
            { Name, Email, Phone, Enroll_No, Date_Of_Admission },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json(updatedStudent);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err });
    }
});
router.delete("/deletestud/:id", async (req, res) => {
    const { id } = req.params;
    console.log("ID=>",req.params);
    try {
        const deletedStudent = await students.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err });
    }
});

module.exports=router;
