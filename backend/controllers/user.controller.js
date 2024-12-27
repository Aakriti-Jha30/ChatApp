import User from "../models/user.model.js"

export const getUsersforSidebar=async(req,res)=>{
    try{

        const loggedInUserId=req.user._id;

        const filteredUsers=await User.find({_id: {$ne: loggedInUserId}} ).select("-password") //Find every user in database except the user logged in

        res.status(200).json(filteredUsers);


    }catch(error){
        console.log("Error in the function",errormessage);
        res.status(500).json({error:"Internal Server error"});
    }
}