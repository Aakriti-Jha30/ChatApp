import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';


const useLogin = () => {
  const [loading,setLoading]=useState(false);
  const {setAuthUser}=useAuthContext();

 
  const login=async (userName,password)=>{
    const success= handleInputErrors({userName,password});
    if(!success) reutrn;
    setLoading(true);
    try{
    const res=await fetch("/api/auth/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({userName,password}),
    }) 
    if (!res.ok) {
        throw new Error(`Failed to log in. Status: ${res.status}`); // Throw an error if response is not OK
     }
    const data=await res.json();

    

      if (data.error) {
        throw new Error(data.error); // Properly handle API error
      }

    localStorage.setItem("chat-user",JSON.stringify(data));
    setAuthUser(data);
    
   }catch(error){
    toast.error(error.message);
   }finally{
    setLoading(false)
   }

  } 
  return {loading,login}
}

export default useLogin

function handleInputErrors({userName,password}){

  if(!userName||!password){
    toast.error("Some fields are missing!");
    return false;
  }


  return true;

 }