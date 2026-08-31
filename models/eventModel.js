import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        id: String,
        url: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date
    },
    Address: {
        type: String
    },
    category: {
        type: String
    },
    difficulty: {
        type: String
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'  // Changed from "User" to "Team"
    }],
    teamSize: {
        type: Number
    }
}, {
    timestamps: true
});

export const Event = mongoose.model("Event", schema);
