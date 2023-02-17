const express=require('express');
const app=express();
const {connectDB}=require('./config/db');

connectDB();
const PORT=1338;
app.use(express.json());
app.use(express.static('content'));

app.listen(PORT,()=>{
    console.log('server is running');
})