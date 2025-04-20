const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/register", async (req,res)=>{
    const { username,password,age,email}=req.body;
    const userExist= await User.findOne({username});
    if(userExist){
        return res.status(402).json({message:"User already Exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({username , password:hashedPassword,age,email})
    await newUser.save()
    res.status(201).json({message:"User Registered Successfully!"}, user_id=newUser._id)
    console.log("hi")
    
});

router.post("/login", async(req,res)=>{
    const { username,password }=req.body;
    const userExist= await User.findOne({username});
    if(!userExist){
        return res.status(402).json({message:"Please register"})
    }
    const isSame= bcrypt.compare(password,userExist.password);
    if(!isSame){
        return res.status(401).json({message:"Password is Incorrect"});
    }
    const token = jwt.sign({id:userExist._id},process.env.JWT_SECRETKEY,{expiresIn:'1hr'})
    res.send({token})
    
})

router.get("/profile", authMiddleware, async (req, res) => {
    res.status(200).json({ userId: req.user.id });
})

router.delete("/delete/:userId", authMiddleware, async (req, res)=>{
    const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).send("User not found");

    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user");
  }

})

module.exports=router;