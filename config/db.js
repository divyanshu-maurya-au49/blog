import mongoose from "mongoose";
import dotenv from 'dotenv'

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connection to mongodb database'.bgMagenta.white);
    } catch (error) {
        console.log('mongo connection error', error.bgRed.white);
    }
}

export default connectDB;