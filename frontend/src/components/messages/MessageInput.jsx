import { useState } from "react";
import { BsSend,  BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message,setMessage]=useState("");
	const {loading,sendMessage}=useSendMessage();
	const [showEmojiPicker,setShowEmojiPicker]=useState(false);


    const handleEmojiClick=(emoji)=>{
		setMessage((prev)=>prev+emoji.emoji);
	}
	const handleSubmit=async (e)=>{
		e.preventDefault();
		if(!message) return;
		await sendMessage(message);
		setMessage(""); //Set message to empty string again
	}
	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e)=>setMessage(e.target.value)}

				/>
				<button type='button' className='absolute inset-y-0 end-10 flex items-center ps-3'	
                   onClick={() => setShowEmojiPicker((prev) => !prev)}>
				<BsEmojiSmile />
				</button>

				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'	>
                  {loading?<div className="loading loading-spinner"></div>:<BsSend/>}
				</button>

				{showEmojiPicker && ( <div className="absolute bottom-12 left-0 z-10 bg-gray-800 p-2 rounded-lg shadow-lg">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
             </div>)}
			</div>
		</form>
	);
};
export default MessageInput;