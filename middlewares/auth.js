const jwt=require("jsonwebtoken");
const User = require("../models/userModels");
const isAuthenticated=async (req,res,next)=>{
    try{
        const authHeader= req.headers.authorization; //['Bearer',"{TOKEN}"]
        console.log(authHeader);
        if(!authHeader){
            return res.status(401).json({
                err:"you must be logged in",
            });
        }
        const token=authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({err:"No token, authentication denied"});

        }
        const decoded=jwt.verify(token,"SECRET MESSAGE");
        const user=await User.findOne({where:{id:decoded.user.id}});
        if(!user){
            return res.status(404).json({err:"user not found"});
        }
        req.user=user;
        next();
    }catch(e){
        console.log(e);
        return res.status(500).send(e);
    }
}

const isSeller=(req,res,next)=>{
    if(req.user.dataValues.isSeller){
        next();
    }else{
        return res.status(401).json({
            err:"you are not seller",
        });
    }
};

const isBuyer=async (req,res,next)=>{
    if(!req.user.dataValues.isSeller){
        next();
    }
    else{
        return res.status(401).json({
            err:"you are not Buyer "
        })
    }
}

module.exports={isAuthenticated,isSeller, isBuyer};  