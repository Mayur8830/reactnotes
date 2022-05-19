import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css'
import { LoadUser } from '../../Actions/User'


const Home = () => {
  const dispatch =useDispatch();
  const [note,setNote] = useState(''); 
  const [id,setId] = useState("");
  const notes = useSelector(state => state.user.user.notes);
  const {blurActive} = useSelector(state => state.user);

// console.log(a);

  // const notes = [];
  const getNote = (e) => {
    e.preventDefault();
    setNote(e.target.value);  
}

const Addnote = () => {
 try {
  if(note){
    const  obj = {
      note:note,
      id,
  }
  axios.post("/postnotes",obj).then(res => {
    if(res.data === "Notes Added" || res.data === "Notes Updated"){
     dispatch(LoadUser());
     alert(res.data)
    }
   })
   setId("");
   setNote("");
   dispatch({
     type:"clearCompanyName",
   })
  }else{
    
    alert("Please fill the Note")
  }
 } catch (error) {
   alert(error.response.data.message)
 }
}

 const deleteNote = (id) => {
 try {
  axios.delete(`/deletenotes/${id}`)
  .then(res => {
     if(res.data === "Note Deleted"){
       dispatch(LoadUser());
     }
    alert(res.data);
    })
 } catch (error) {
   alert(error.response.data.message)
 }
 
}

const editNote = (id) => {
 window.scrollTo(0,0);
 setId(id);
   const editnote = notes.find(ele => ele._id === id)
   setNote(editnote.note);
}

  return (
  
    <>
    <div className= { blurActive ? " blur main-body" : "main-body"}> 
    <div className='notes'>
        <h3 className="notehead">Add Notes</h3>
        <textarea rows={6} type="text" placeholder='Write Your Note' className='inputnote' value={note} onChange={getNote} autoFocus/>
        <div className='btnaddnote' onClick={Addnote}>Add note</div>
        <hr />

        <h3 className="notehead">My Notes</h3>
        <div className="allnotes">
       {notes.map((ele,index) => {
           const {note,date,_id} = ele;
           return(
        <div className="box" key={index} >
           <div className="titledate">
           <div className="title">Note {index}</div>
            <p className='notedate'>{date}</p>
           </div>
           <div className="content">{note}</div>
            <div className="btndiv">
            <div className="btneditnote" onClick={() => editNote(_id)}>
             <span className="material-icons edit-icon">edit_note</span>
              </div>
              <span className='hover-edit'>Edit</span>
            <div className="btndeletenote" onClick={() => deleteNote(_id)}> 
            <span className="material-icons delete-icon">delete_outline</span>
            </div>
            <span className='hover-delete'>Delete</span>

            </div>
        </div>
           )
       })}
        
    </div>
   
   
    </div>
    </div>
     </>




  )
}

export default Home