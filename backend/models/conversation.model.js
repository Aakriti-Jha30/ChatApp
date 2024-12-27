import mongoose from "mongoose";

const conversationSchema=new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User", //an id will be coming from user
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[], //Intially empty we push messageId in this
        }
    ]
  
},{timestamps:true});

const Conversation=mongoose.model("Conversation",conversationSchema);

export default Conversation;