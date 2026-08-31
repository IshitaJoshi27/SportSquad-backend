import mongoose from "mongoose";

const  connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            dbName : "sportsquad",
        });
        
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;