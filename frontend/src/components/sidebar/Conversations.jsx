import Conversation from "./Conversation";
import useGetConversaations from "../../hooks/useGetConversaations";
import { getrandomEmoji } from "../../utils/emoji";

const Conversations = () => {
	const {loading,conversations}=useGetConversaations();
	console.log(conversations);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation,idx)=>{
			return(
              <Conversation 
			  key={conversation._id}
			  conversation={conversation}
			  emoji={getrandomEmoji()}
			  lastIdx={idx === conversations.length-1}
			  />
			);
			})}
			{loading?<span className="loading loading-spinner mx-auto"></span>:null}
		</div>
	);
};
export default Conversations;
