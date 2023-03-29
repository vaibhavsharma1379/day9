const {Sequelize, or}=require("sequelize");

const createDB=new Sequelize('test-db','user','pass',{
    dialect:'sqlite',
    host:'./config/db.sqlite',
})

const connectDB=()=>{
    createDB.sync().then(()=>{
        console.log("connected to db");
    })
    .catch((e)=>{
        console.log("db connection failled ");
    })
}

module.exports={createDB,connectDB};

const orderModel=require("../models/orderModels");
const userModel=require("../models/userModels");
orderModel.belongsTo(userModel,{foreignKey:"buyerId"});
userModel.hasMany(orderModel,{foreignKey:"id"});
