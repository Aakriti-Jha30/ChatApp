import { Server } from "socket.io";
import http from 'http'; 
import express from "express";

const app=express();


const server=http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:['http://localhost:3000'], //as socket can give us some cors error
        methods:["GET","POST"],
    }
});

export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}




const userSocketMap={}; //{userId:socketId}

io.on("connection",(socket)=>{
    console.log('A user is connected',socket.id);

    const userId=socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId]=socket.id;

    //send events 
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    //Listen to events,can be used both on client and server side
    socket.on("disconnect",()=>{
        console.log("A user is disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));

    })
})


export {app,io,server};