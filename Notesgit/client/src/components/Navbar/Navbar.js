import React, { useState,useEffect } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import Profile from '../Profile/Profile';



const Navbar = () => {
  const [ profileActive , setProfileactive] = useState(false);
  const name = useSelector(state => state.user.user.name);
  const dispatch = useDispatch();


  useEffect(() => {
    if(profileActive){
      dispatch({
        type:"BlurActive",
        payload: true
       })
    }
    if(!profileActive){
      dispatch({
        type:"BlurActive",
        payload: false
       })
    }
   }, [dispatch,profileActive])
   

  return (<>
    <div className='navbar'>
     <div className="logo">
     <h3>MyNotes</h3>
     </div>
   <div className="other">
    <Link  to={'/'}>Home</Link>
    <Link  to={'/about'}>About</Link>
    <Link  to={'/contact'}>Contact Us</Link>
    <Link  to={'/service'}>Services</Link>

    <div className="profile" onClick={() => setProfileactive(!profileActive)}>{name[0]} </div> 
     <span className='hover-profile'>{name}</span>    
    
   </div>
    </div>
    { profileActive && < Profile />}
    </>
  )
}

export default Navbar