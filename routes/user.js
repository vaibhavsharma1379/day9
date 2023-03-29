const express=require('express');
const User=require("../models/userModels");
const bcrypt=require("bcrypt");
const router=express.Router();
const jwt = require("jsonwebtoken");
const{
    validateEmail,
    validatePassword,
    validateName}=require("../utils/validators");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - isSeller
 *       properties:
 *         id:
 *           type: INTEGER
 *           description: The auto-generated id of the user
 *         name:
 *           type: STRING
 *           description: The name of the user
 *         email:
 *           type: STRING
 *           description: The email of the user
 *         password:
 *           type: STRING
 *           description: The password of the user
 *         isSeller:
 *           type: BOOLEAN
 *           description: The role of the user
 *       example:
 *         name: Harsh
 *         email: hk@gmail.com
 *         password: Harsh@8
 *         isSeller: false
 */


router.post('/signup',async(req,res)=>{
    try{ const {name,email,password,isSeller}=req.body;
        const existingUser=await User.findOne({where:{email}});
        if(existingUser){
            return res.status(403).json({err:"User already Exist"});

        }
        if(!validateName(name)){
            return res.status(400).json({err:"Invalid Name"});
        }
        if(!validateEmail(email)){
            return res.status(400).json({err:"invalid email"});
        }
        if(!validatePassword(password)){
            return res.status(400).json({err:"Error: Invalid password: password must be at least 8 characters long and must include atleast one - one uppercase letter, one lowercase letter, one digit, one special character"});
        }
        const hashedPassword=await bcrypt.hash(password,(saltOrRounds=10));
        const user={
            name,
            email,
            password:hashedPassword,
            isSeller
        };
        const createdUser=await User.create(user);
        return res.status(200).json({message:`Welcome to Devsnest ${createdUser.name}. Thank you for signing up`});

    }
    catch(e){
        console.log(">>>>",e);
        return res.status(500).send(e);
    }
})

router.post('/signin',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email.length==0){
            return res.status(400).json({err:"please eneter your email"});
        }
        if(password.length==0){
            return res.status(400).json({err:"please eneter your passsword"});
        }
        const existingUser=await User.findOne({where:{email:email}});
        if(!existingUser){
            return res.status(404).json({err:"User not found"});
        }
        const passwordMatched=await  bcrypt.compare(password,existingUser.password);
        if(!passwordMatched){
            return res.status(400).send("Error:Incorrect Password");
        }
        const payload={user:{id:existingUser.id}};
        const bearerToken=await jwt.sign(payload,"SECRET MESSAGE",{
            expiresIn:3600000,
        })
        res.cookie("t",bearerToken,{expire:new Date()+9999});
        return res.status(200).json({
            bearerToken:bearerToken,message:"Signed In Successfully!"
        })
    }
    catch(e){
        console.log(">>>",e);
        return res.status(500).send(e);
    }
})
router.get('/signout',(req,res)=>{
    try{
        res.clearCookie('t');
        return res.status(200).json({message:"cokkie cleared"});
    }catch(e){
        return res.status(500).send(e);
    }
})

module.exports=router;