import React, { useEffect, useState } from 'react'
import './Login.css'
import {  Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
// import { LoginUser } from '../../Actions/User';
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const Login = () => {
  const navigate = useNavigate()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const error = useSelector(state => state.user.error);
    const dispatch = useDispatch()       

  const loginHandler = async (e) => {
      e.preventDefault();
      try {

        dispatch({
            type:"LoginRequest"
        })

        const {data} = await axios.post("/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
        navigate("/")
        

    } catch (err) {
        dispatch({
            type:"LoginFailure",
            payload:err.response.data.message
        })
        
    }  
  }

  useEffect(() => {
  if(error) {
    alert(error);
    dispatch({
      type:"ClearError"
    })
  }  
     
  }, [dispatch,error])
  
  return (
    <div className='login'> 
        <form className='loginForm' >
        < Avatar sx={{ height: '100px', width: '100px'}} />
        <input type="email" placeholder='Email' 
         value={email}
         onChange ={(e) => setEmail(e.target.value) }
        required/>
        
        <input type="password" placeholder='Password' 
         value={password}
         onChange ={(e) => setPassword(e.target.value) }
        required/>
       <button onClick={loginHandler} >Login </button>
        </form>
     </div>
  )
}

export default Login