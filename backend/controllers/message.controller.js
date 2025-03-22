import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId,io } from "../socket/socket.js";


export const sendMessage=async(req,res)=>{
    try{
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id; //First we add a middleware to check if user is logged in

        //We need to set a new message
        //=>Ensure that this is present in the conversation
        //=>Ensure that this the new message id has also been added to the list in the conversation

        let conv=await Conversation.findOne({
            participants: { $all: [senderId,receiverId]},
         });
        
        if(!conv){
            //This is the first time sender and user are interacting,create a conversation in this case
            conv=await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        //Now this new message,we need to have senderId,recevier id
        const newMessage=new Message({
            senderId:senderId,
            receiverId:receiverId,
            message:message,
        })

       // await Message.save(newMessage);
        
        if(newMessage){
            conv.messages.push(newMessage._id);
            
        }
        
        //Well this will take longer :(
        // await conv.save(); //We have put this save so that after we have actually made changes and push the messageId into the message array of the conv we can resave
        // await newMessage.save();
        await Promise.all([conv.save(),newMessage.save()]); 

        //=>SOCKET.IO FUNCTIONALITY WILL GO HERE(TO MAKE IT REAL TIME)

       const receiverSocketId=getReceiverSocketId(receiverId);
       //=>Sending to a speicific client
       if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
       }


      
        //Return the new message
        res.status(200).json(newMessage);



       

    }catch(error){
        console.log("Error in send message controller",error.message);
        res.status(500).json({error:"Internal Server error"});

    }
}

export const getMessages=async(req,res)=>{
    try{

        const senderId=req.user._id;
        const {id:usertoChatId}=req.params; //We will be getting this from the id

        //Now we would need a conversation
        const conv=await Conversation.findOne({
            participants:{ $all:[senderId,usertoChatId] },
        }).populate("messages"); //Not reference but actual message between them

      
    
        if (!conv) return res.status(200).json([]);


        const messages=conv.messages;
        //We would now need the ids of the message from the conversation model which we are gonna find and return from messsage model
        res.status(200).json(messages);

    }catch(error){
        console.log("Error in getMessages Controller",error.message);
        res.status(500).json({error:"Internal server error"})
    }


}