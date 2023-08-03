import mongoose from 'mongoose';

const {Schema} = mongoose;

const projectSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User' 
    }],
    timespent: {
        type: Number,
        default: 0
    },
    
},{timestamps:true})


export default mongoose.model("Project", projectSchema);