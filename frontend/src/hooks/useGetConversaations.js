import React, { useState } from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const useGetConversaations = () => {
  const [loading,setLoading]=useState(false);
  const [conversations,setConversations]=useState([]);

  useEffect(()=>{
  const getConversations=async ()=>{
    setLoading(true);
    try{
        const res=await fetch('/api/users'); //Since its a get request you dont have to put any options
        const data=await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        setConversations(data);
    }catch(error){
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
  }

  getConversations();
  },[])


return {loading,conversations};
}

export default useGetConversaations