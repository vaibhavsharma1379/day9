//middlewares are the functions which are called before the actual functions

const express=require("express");
const {isAuthenticated,isSeller,isBuyer}=require('../middlewares/auth');
const Product = require("../models/productModels");
const upload = require("../utils/fileUpload");
const router=express.Router();
// const {stripeKey}=require('../config/credentials');
const stripe=require("stripe")(
    "place-your-stripe-key-here"
  );
const {WebhookClient}=require("discord.js");
const webhook=new WebhookClient({
    url:"https://discord.com/api/webhooks/1077285857888841860/RX1cId46dfsimwMVgrDxMep91w095L_0Uiu8IymQj2tJUUb3i3MANS8A6tA4bcAeE96s "
})

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
            products
        });
    }
    catch{
        return res.status(500).send(e);
    }
})

router.post("/buy/:productId",isAuthenticated,isBuyer,async (req,res)=>{
    try{
        const productFind=await Product.findOne({
            where :{id:req.params.productId}
        });
        const product=productFind.dataValues;
        webhook.send({
                        content:`I am sending it from day 10 for order id:${product.id}`,
                        username:"vaibhav",
                        avatarURL:"https://i.imgur.com/AfFp7pu.png"
        
                    })
        // if(!product){
        //     return res.status(404).send({e:"no product found"});
        // }
        const orderDetails={
            productId,
            buyerId:req.user.id,

        }}
    //     let paymentMethod=await stripe.paymentMethod.create({
    //     type:"card",
    //     card:{
    //         Number:"4242424242424242",
    //         exp_month:9,
    //         exp_year:2023,
    //         cvc:"314"
    //     }
    //     });
    //     let paymentIntent=await stripe.paymentIntent.create({
    //         amount:product.price,
    //         currency:"inr",
    //         payment_method_types:["card"],
    //         payment_method:paymentMethod.id,
    //         confirm:true
    //     });
    //     if(paymentIntent){
    //         const createOrder=await Order.create(orderDetails);
    //         webhook.send({
    //             content:`I am sending it from day 10 for order id:${createOrder.id}`,
    //             username:"vaibhav",
    //             avatarURL:"https://i.imgur.com/AfFp7pu.png"

    //         })
    //         return res.status(200).json({createOrder})
    //     }
    //     else{
    //         return res.status(400).json({ err: "Something went wrong" });
    //     }
    // }
    catch(e){
        return res.status(500).send(e);
    }
})

module.exports=router;