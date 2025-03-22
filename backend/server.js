import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToDatabase from "./db/connectToMongoDB.js";
import { app ,server} from "./socket/socket.js";



dotenv.config();


const PORT=process.env.PORT||5000 


//Configuring app
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

const startServer=async()=>{
    await connectToDatabase();
    server.listen(PORT,()=>{
        console.log(`App is listening on port ${PORT}`);
    })
}

startServer();






























// app.listen(PORT,()=>{
// connectToDatabase();
// console.log(`App is listening on port ${PORT}`);
// })

// //Test route
// app.get("/",(req,res)=>{
//     res.send("The app is running fine");
//     })