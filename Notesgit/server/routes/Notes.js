const express = require('express')

const router = express.Router();
const { isAuthenticated } = require('../middleware/auth')
const NotesData = require('../models/Notes');
const User = require("../models/User");


//routes
router.post('/postnotes',isAuthenticated,async(req,res) => {
    try {
       
    const {note,cname,id} = req.body;

    // not note present
    if(!note){
      return  res.status(400).json({
            success:false,
            massage: " Please fill the note"
        })
    }
    
// if the id is present means ==>  notes exist so we have to update it
if(id){
 const data = await NotesData.updateOne({_id:id},{$set:{note}});
 if(data.modifiedCount === 1){
   return  res.status(200).json("Notes Updated");
    }else{
    return res.status(200).json("Fail to Update");
 }
}
// create a note and store
else{
    
const data = new NotesData({
    note,
    cname:cname || "none",
    date:new Date().toJSON().slice(0,10),
})
 const resData = await data.save();

    const user = await User.findById(req.user._id);

    
    user.notes.push(resData._id);
    await user.save();

    return res.status(201).json("Notes Added");
 

}
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

router.delete("/deletenotes/:id" ,isAuthenticated,async(req,res)=> {
    try {
        const note = await NotesData.findById(req.params.id);
        if(!note){
            return res.status(404).json({
                success:false,
                message:"Note not Found",
            })
        }


    const deleteEle = await NotesData.deleteOne({ _id: req.params.id });
   
    if(deleteEle.deletedCount === 1 ){
        const user = await User.findById(req.user._id);   
        index = user.notes.indexOf(note._id);
        user.notes.splice(index,1);
         await user.save();
       
        res.status(200).send("Note Deleted")
    }else{
        res.status(400).send("Note not Deleted")
    }
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})


module.exports = router