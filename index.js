const express=require('express');
const app=express();
const {connectDB}=require('./config/db');
const userRoutes=require('./routes/user');

// connectDB();
const PORT=1338;
app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({extends:false}));

app.use('/api/v1/user',userRoutes)

app.listen(PORT,()=>{
    console.log('server is running');
    connectDB();
})