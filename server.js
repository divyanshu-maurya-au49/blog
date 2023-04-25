// const express = require('express')
import  express  from 'express';
import mongoose from "mongoose";

import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import dotenv from 'dotenv';
import userRoutes  from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import connectDB from './config/db.js';
import path from 'path';

//env config
dotenv.config();
connectDB();

//rest object
const app = express();

//middlewere
 app.use(cors())
 app.use(express.json())
 app.use(morgan('dev'))

 mongoose.set('strictQuery',true);

 //router
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);


//static file for the deploy

app.use(express.static(path.join(__dirname, "./client/build")))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

const PORT = process.env.PORT ||5000

app.listen(PORT,()=>{
    console.log(`server is running on ${process.env.DEV_MODE} port number ${PORT}`.bgCyan.white);
})