const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const crypto = require('crypto');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Member = require('../models/memberModel');
const Message = require('../models/messageModel');
const { message } = require('antd');

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
        req.body.isAdmin = true;
        const newuser = new User(req.body);
        newuser.verificationToken = crypto.randomBytes(20).toString("hex");

        sendVerificationEmail(newuser.email, newuser._id);
        await newuser.save();

        res.status(200).send({message : "User created" , success: true});
    } catch(error){
        console.log(error)

        res.status(500).send({message : "error creating User" , success: false, error});

    }
})

 router.post('/registeruser' , async (req,res) => {
    try{

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password , salt);
        req.body.password = hashedPassword;


        const newdoctor = new Member({...req.body});
        


        const adminUser= await User.findOne({email: req.body.useremail});

        newdoctor.boss = adminUser._id

        await newdoctor.save();

            const clients = adminUser.clients
            clients.push(
                 newdoctor._id,
                

           )
           await User.findOneAndUpdate(adminUser._id, {clients})


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
        if(user.verified==false){
            return res.status(200).send({message : " verify email" , success : false});

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
router.post('/userlogin' , async (req,res) => {
    try{
        const adduser  = await Member.findOne({ email : req.body.email})
        if(!adduser){
            return res.status(200).send({message : " User not exist" , success : false});

        }
        const isMatch = await bcrypt.compare(req.body.password , adduser.password);
        if(!isMatch){
            return res.status(200).send({message : " Password is incorrect" , success : false});

        }
        else{
            const token = jwt.sign({id: adduser._id}, process.env.JWT_SECRET ,{
                expiresIn: "1d"
            })
            res.send({message:"login successful", success:true , data:token});

        }
      
    } catch(error){
        console.log(error)
        res.status(500).send({message : "error loggin in" , success: false ,error })
    }
})
router.post("/get-user-info-by-id" ,authMiddleware,  async(req,res)=>{
    try{

        const user = await User.findOne({ _id : req.body.userId});
        
        user.password = undefined;

        if(!user){
            return res.status(200).send({message : "user does not exist", success: false});
            
        }
        else{
            return res.status(200).send({ 
                success: true ,
                 data: user,
                });

        }
    }catch(error){
        return res.status(500).send({message : "error getting user info", success: false ,error});

    }
});
router.post("/get-member-info-by-id" ,authMiddleware,  async(req,res)=>{
    try{

        const user = await Member.findOne({ _id : req.body.userId});
        
        user.password = undefined;

        if(!user){
            return res.status(200).send({message : "user does not exist", success: false});
            
        }
        else{
            return res.status(200).send({ 
                success: true ,
                 data: user,
                });

        }
    }catch(error){
        return res.status(500).send({message : "error getting user info", success: false ,error});

    }
});

router.post("/get-posts",authMiddleware, async (req, res) => {
    try {
       
      const adminmembers = await Member.find({ boss :  req.body.userId });
      return res.status(200).send({ 
        adminmembers
        });


    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  const sendVerificationEmail = async (email, _id) => {
    //create a nodemailer transporter
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amirpb87@gmail.com",
        pass: "zuzihuzontqijepr",
      },
    });
      //compose the email message

    const mailOptions = {
      from: "TripLink",
      to: email,
      subject: "Email Verification",
      text: `Hi there! Thank you for signing up for TripLink,to get started, we need to verify your email address.
      simply click the link to verify your email address: http://localhost:3000/verify/${_id}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("error sending email", error);
    }
  };
  const sendPasswordToken= async (email, changepass) => {
    //create a nodemailer transporter
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amirpb87@gmail.com",
        pass: "zuzihuzontqijepr",
      },
    });
      //compose the email message

    const mailOptions = {
      from: "TripLink",
      to: email,
      subject: "Email Verification",
      text: `${changepass}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("error sending email", error);
    }
  };

  router.get('/verify/:id', async (req, res) => {
    try {
       
        const user= await User.findOne({_id : req.params.id})
        if(!user) return res.status(400).send({ message: "Email verification failed" });
        
        
        await User.updateOne({_id : user._id ,verified: true , verificationToken : null} )
      res.status(200).json({ message: "Email verified successfully" });
        console.log(user._id)
    } catch (error) {
      console.log("error getting token", error);
      res.status(500).json({ message: "Email verification failed" });
    }
  });
  
  router.post("/message", async (req, res) => {
    try{

        //loggin user
        const adminUser= await User.findOne({email: req.body.useremail});

        req.body.from = adminUser.email;



        const newmessage = new Message(req.body);

        newmessage.messages = req.body.message;
        newmessage.to = req.body.memberid;

        await newmessage.save();

        res.status(200).send({message : "ההודעה נשלחה" , success: true});
    } catch(error){
        console.log(error)

        res.status(500).send({message : "error creating User" , success: false, error});

    }
  });
  
  router.post("/get-messages" ,authMiddleware,  async(req,res)=>{
    try{
        const some =  User.findById ;

        const adminuser = await Member.findOne({ email : some});

            const adminemail = adminuser.email
        const user = await Message.find({ to : adminemail});
        

        if(!user){
            return res.status(200).send({message : "user does not exist", success: false});
            
        }
        else{
            return res.status(200).send({ 
                success: true ,
                 data: user,
                });

        }
    }catch(error){
        return res.status(500).send({message : "error getting user info", success: false ,error});

    }
});
router.post('/forgotpassword', async (req, res) => {
    try {
       
        const user= await User.findOne({email : req.body.email})
        if(!user) return res.status(400).send({ message: "Email not found" });
       await  User.updateOne
       ({email : user.email ,changepass: crypto.randomBytes(2).toString("hex") }
       , sendPasswordToken(user.email, user.changepass) )
   
       

        res.status(200).json({ message: "Email sent successfully",success: true });
        console.log(user.email)
    } catch (error) {
      console.log("error getting token", error);
      res.status(500).json({ message: "Email verification failed" });
    }
  });
  router.post('/entertoken', async (req, res) => {
    try {
       
        const user= await User.findOne({email : req.body.email})
        const resetcode = user.changepass;
        const inputresetcode = req.body.password
      

        if(resetcode == inputresetcode){
            res.status(200).json({ message: "code currect" ,success: true });
            await User.updateOne({email : user.email ,changepass: null } )

    
        }
        else {
            res.status(200).json({ message: "code fail" ,success: false });

        }
    } catch (error) {
      console.log("error getting token", error);
      console.log(" reset" ,resetcode )
      console.log(inputresetcode ," resetinput"  )

      res.status(500).json({ message: "Email verification failed" });
    }
  });
  router.post('/newpassword', async (req, res) => {
    try {
       
        const user= await User.findOne({email : req.body.email})
        const newpassword = req.body.password
        const newpasswordagain = req.body.passwordagain
        const salt = await bcrypt.genSalt(10);


        if(newpassword == newpasswordagain){
            res.status(200).json({ message: "password changed" ,success: true });

            const hashedPassword= await bcrypt.hash(newpassword , salt);
            req.body.password = hashedPassword;
            await User.updateOne({email : user.email ,password: hashedPassword } )

        }
        else {
            res.status(200).json({ message: "password dosnt match" ,success: false });

        }
    } catch (error) {
      console.log("error getting token", error);
      console.log(" reset" ,resetcode )
      console.log(inputresetcode ," resetinput"  )

      res.status(500).json({ message: "Email verification failed" });
    }
  });
module.exports = router ;