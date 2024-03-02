const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post('/register' , async (req,res) => {
    try{

        const userExist = await User.findOne({email: req.body.email})
        if(userExist){
            return res.status(400).send({message: "User already exist" , success: false });
            
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password , salt);
        req.body.password = hashedPassword;
        const newuser = new User(req.body);
        await newuser.save();
        res.status(200).send({message : "User created" , success: true});
    } catch(error){
        console.log(error)

        res.status(500).send({message : "error creating User" , success: false, error});

    }
})

router.post('/login' , async (req,res) => {
    try{
        const user  = await User.findOne({ email : req.body.email})
        if(!user){
            return res.status(200).send({message : " User not exist" , success : false});

        }
        const isMatch = await bcrypt.compare(req.body.password , user.password);
        if(!isMatch){
            return res.status(200).send({message : " Password is incorrect" , success : false});

        }
        else{
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET ,{
                expiresIn: "1d"
            })
            res.send({message:"login successful", success:true , data:token});

        }
      
    } catch(error){
        console.log(error)
        res.status(500).send({message : "error loggin in" , success: false ,error })
    }
})

module.exports = router ;