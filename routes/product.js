//middlewares are the functions which are called before the actual functions

const express=require("express");
const {isAuthenticated,isSeller}=require('../middlewares/auth');
const Product = require("../models/productModels");
const upload = require("../utils/fileUpload");
const router=express.Router();

router.post("/create",isAuthenticated,isSeller,(req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
            console.log(err)
            return res.status(500).send(err);
        }
        const {name,price}=req.body;
        if(!name||!price||!req.file){
            return res.status(400).json({
                err:"we require all three"
            })
        }
        if(Number.isNaN(price)){
            return res.status(400).json({err:"price must be a number"})
        }
        let productDetails={
            name,
            price,
            content:req.file.path
        }
        const createProduct=await Product.create(productDetails);
        console.log("created product",createProduct);
        return res.status(200).json({ message: "Product created" })

    })
});

module.exports=router;