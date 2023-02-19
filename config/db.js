const {Sequelize}=require("sequelize");

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