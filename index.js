const express=require('express');

const {connectDB}=require('./config/db');
const userRoutes=require('./routes/user');
const productRoutes=require('./routes/product');
// connectDB();
const swaggerUI=require('swagger-ui-express');
const swaggerJsDoc=require('swagger-jsdoc');
const BASE_URL = process.env.BASE_URL;
require("dotenv").config();
const PORT=process.env.PORT;

const specs=swaggerJsDoc({
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Photo Store API",
            version:"1.0.0",
            description:'Buy/Sell photos'
        },
        servers:[
            {
                url:BASE_URL,
            }
        ],
    },
    apis:["./routes/*.js"],
    
})
const app=express();
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs));
app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({extends:false}));

app.use('/api/v1/user',userRoutes)
app.use("/api/v1/product", productRoutes);

app.listen(PORT,()=>{  
    console.log('server is running');
    connectDB();
})