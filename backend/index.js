import express from 'express';
import mongoose from 'mongoose';
import cors from'cors';
import 'dotenv/config';

const PORT = process.env.PORT ||  8000;
const app = express();


//midleware
app.use(cors());

const connectDB = async () =>{
    try{
        await mongoose;connect(process.env.DB_CONNECTION_STRING);
        console.log('mongodb Connected');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})