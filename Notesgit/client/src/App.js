import './App.css';
import  {BrowserRouter as Router,Route,Routes}  from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact  from './pages/Contact/Contact';
import Services  from './pages/Services/Services';
import Login from './components/Login/Login'
import  {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import {LoadUser} from './Actions/User'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'



function App() {
  const dispatch = useDispatch();
  const {userloading,isAuthenticated} =  useSelector(state => state.user); 

useEffect(() => {
  if(localStorage.getItem('token') !== null){
    dispatch(LoadUser());
  }
  
 
}, [dispatch])


if(userloading){
  return (
    <Router>
     <h3>Loading....</h3>
    </Router>
  );
}else{
  return (
    <Router>
     {isAuthenticated && < Navbar />}
       < Routes >
      
         < Route path='/login'  element={ < Login />}/>
         
         <Route element ={ <ProtectedRoute />  } >

           < Route path='/'  element={ < Home />}/>
           < Route path='/about'  element={ < About />}/>
           < Route path='/contact'  element={ < Contact />}/>
           < Route path='/service'  element={ < Services />}/>
         </Route>
       </Routes>


    </Router>
  );
}
}

export default App;
