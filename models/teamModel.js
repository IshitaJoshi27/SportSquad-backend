import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    members:[{
        name:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            required:true,
        },
    }],
    leader:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true,
    },
    registeredEvent:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Event',
        required:true,
    },
});

export const Team = mongoose.model("Team", schema);
