import React, { useState } from 'react';
import './Register.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";



function Login ({setLoginToken,getUser}) {
  const history = useHistory()
 
  const [ user, setUser] = useState({     
      email:"",
      password:"",
      errors:''
      
});



  const handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target
    setUser({
        ...user,
        [name]: value
    });
  }
 
 const login = async (event)=>  {
    event.preventDefault();

    const tokenn=localStorage.getItem("token");
    if( user.email && user.password ){
      setUser({errors:''});
          await axios.post("http://localhost:5000/api/login", user)
          .then(res => {
            setLoginToken(res.data.token);    
             localStorage.setItem("token", res.data.token);
            if(res.data.success===true){
              if(user.email==="admin@dihia.com"){
                localStorage.setItem("token", res.data.token);
                history.push("/AdminPage");
              }else{
                localStorage.setItem("token", res.data.token);
                //get user data to show it n user page
                if(tokenn!== null){
                  axios.get(`http://localhost:5000/api/verify?token=${tokenn}`)
                    .then(res =>{
                      if(res.data.success===true){
                      axios.get(`http://localhost:5000/api/getUser?token=${tokenn}`)
                      .then(res=>{
                        getUser(res.data.user)
                      })                
                      }
                    });
                  }
                //---------------------end getting user data*/
                history.push("/HomePage");
            }}else{
         setUser({errors:res.data.message});
            }
        })
          console.log(' logged in');
      } else {
         setUser({errors:'error'});
      }
      
  }
  
    return (
      <div className="form">
      <Link to="/" className="btn-flat">
        <i className="material-icons left">keyboard_backspace</i> Back to
        home
      </Link>
        <ul className="tab-group">
          <li className="tab"><a href="/register">Sign Up</a></li>
          <li className="tab active"><a>Log In</a></li>
        </ul>
        
        <div className="tab-content">
            <h1>Welcome Back!</h1>
            {user.errors ? <p className="errors">error </p>:<p></p> }
            <form >
            
              <div className="field-wrap" noValidate >
              <input type="email" 
               placeholder="Adresse Email"
               required autoComplete="on"
               value={user.email}
               onChange={handleChange }
               name="email"
                            
               />


            </div>
            
            <div className="field-wrap" noValidate >
              <input type="password" 
              placeholder="Mot de passe" 
              required autoComplete="off"
              name="password"
              value={user.password}
              onChange={handleChange }
             />

            </div>
            
            <p className="forgot"><a href="#">Forgot Password?</a></p>
            
            <button className="button button-block"   onClick={login}>Log In</button>
            <p className="have-account"><a href="#">Vous n'avez pas de compte? Créez un!</a></p>
            </form>
  
          </div>
        
  </div> 
    )
}



export default withRouter (Login);


