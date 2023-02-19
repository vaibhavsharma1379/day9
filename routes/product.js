//middlewares are the functions which are called before the actual functions

const express=require("express");
const {isAuthenticated,isSeller}=require('../middlewares/auth');
const router=express.Router();

router.post("/create",isAuthenticated,isSeller,(req,res)=>{

});

module.exports=router;