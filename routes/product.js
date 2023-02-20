//middlewares are the functions which are called before the actual functions

const express=require("express");
const {isAuthenticated,isSeller,isBuyer}=require('../middlewares/auth');
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
router.get("/get/all",isAuthenticated,async (req,res)=>{
    try{
        const products=await Product.findAll();
        return res.status(200).json({
            products;
        })
    }
    catch{
        return res.status(500).send(e);
    }
})

router.post("/buy/:productId",isAuthenticated,isBuyer,async (req,res)=>{
    try{
        const product=await Product.findOne({
            where :{id:req.params.productId}
        })?.dataValues;
        if(!product){
            return res.status(404).send(e);
        }
        const orderDetails={
            productId,
            buyerId=req.user.id,

        }
        
    }
    catch(e){
        return res.status(500).send(e);
    }
})

module.exports=router;