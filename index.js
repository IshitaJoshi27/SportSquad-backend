import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/userRoute.js';
import teamRoute from './routes/teamRoute.js';
import eventRoute from './routes/eventRoute.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import path from 'path';

dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_API,
    api_secret: process.env.Cloud_Secret,
})

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;


app.use('/api/users', userRoute);
app.use('/api/events', eventRoute);
app.use('/api/teams', teamRoute);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', ( req, res) =>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));  
})
    
app.listen(port, () => {    
    console.log(`listening at http://localhost:${port}`);
    connectDB(); 
});