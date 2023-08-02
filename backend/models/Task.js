import mongoose from "mongoose";

const {Schema} = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    timeSpent: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: false,
        default:false,
    },
    project: { 
        type: Schema.Types.ObjectId, 
        ref: 'Project', required: true 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true})


export default mongoose.model("Task", taskSchema);