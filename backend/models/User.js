import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    role :{
        type: String,
        anum:['user','admin'],
        default:'user',

    },
},{timestamps:true})


export default mongoose.model("User", userSchema);