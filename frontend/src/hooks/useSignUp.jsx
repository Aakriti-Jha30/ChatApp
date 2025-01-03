 import React from 'react'
 import { useState } from 'react';
 import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
 
 const useSignUp = () => {
  const [loading,setLoading]=useState(false);
  const {setAuthUser}=useAuthContext();
   

  const signup=async({fullName,userName,password,confirmPassword,gender})=>{
    const success= handleInputErrors({fullName,userName,password,confirmPassword,gender});
    if(!success) reutrn;

    setLoading(true);
    try{
    const res=await fetch("/api/auth/signup",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({fullName,userName,password,confirmPassword,gender}),
    })

    const data=await res.json();
    if(data.error){
      throw new Error(data.error);
    }

    //We set the user to localStorage so that we have the log in information later as well after refreshing it
    localStorage.setItem("chat-user",JSON.stringify(data))
    //contenxt ,wil help us make sure to navigate them to login page
    setAuthUser(data);
   
    }catch(error){
      toast.error(error.message);
    }finally{
      setLoading(false);
    }


  };

return {loading,signup};

};
 
 export default useSignUp


 function handleInputErrors({fullName,userName,password,confirmPassword,gender}){

  if(!fullName||!userName||!password||!confirmPassword||!gender){
    toast.error("Some fields are missing!");
    return false;
  }
  if(password !== confirmPassword){
    toast.error("Passwords don't match");
    return false;
  }
  if(password.length < 8){
    toast.error("Password must be at least 8 charecters");
    return false;
  }


  return true;

 }