import React ,{useState} from 'react';
import './Register.css';
import {Link} from 'react-router-dom';
import 'whatwg-fetch';
import axios from "axios"
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

function Register ({setLoginToken})  {


  const history = useHistory()
  const [ user, setUser] = useState({
      firstName: "",
      lastName: "",
      email:"",
      password:"",
      password2: "",
      errors:''
      
  })

 
  const handleChange = e => {
    e.preventDefault();
      const { name, value } = e.target
      setUser({
          ...user,
          [name]: value
      });
      
  }

  const register = (event) => {
    event.preventDefault();
  
      const { firstName,lastName, email, password, password2 } = user

      if( firstName && lastName && email && password && (password === password2)){
           axios.post("http://localhost:5000/api/register", user)
          .then( res => {
            if(res.data.success===true){
              setLoginToken(res.data.token);
              localStorage.setItem("token", res.data.token);
              history.push("/HomePage");
            }else{
              if(res.data.success===false){
                setUser({errors:res.data.message});
            }}

          })
         

     } else {
         {setUser({errors: 'Error'}); 
     
    }}
}
   
    return (
      
      <>
      {console.log(user)}
        <div className="form" >
        <Link to="/" className="btn-flat">
        <i className="material-icons left">keyboard_backspace</i> Back to
        home
      </Link>
        <ul className="tab-group">
          <li className="tab active"><a>Sign Up</a></li>
          <li className="tab"><a href="/login">Log In</a></li>
        </ul>
        
        <div className="tab-content">
         
            <h1>Créer un compte</h1>
            
            <form>
            {user.errors ? <p className="errors">{user.errors}</p>:<p></p> }
              <div className="field-wrap3" noValidate >
                <input 
                placeholder="Prénom" 
                name="firstName"
                type="text" 
                required 
                autoComplete="on"
                value={user.firstName}
                onChange={ handleChange }
                /> 
              </div>
            
              <div className="field-wrap2" noValidate >
                <input 
                placeholder="Nom" 
                name="lastName"
                type="text" 
                required 
                autoComplete="on"
                value={user.lastName}
                onChange={handleChange }
                 />
              </div>
              
  
            <div className="field-wrap" noValidate >
              <input 
              placeholder="Adresse mail" 
              type="email" required 
              name="email"
              autoComplete="on"
              value={user.email}
              onChange={handleChange }
              />
            </div>
            

            <div className="field-wrap" noValidate >
              <input 
              placeholder="Mot de passe" 
              type="password" required 
              autoComplete="off"
              name="password"
              value={user.password}
              onChange={handleChange }
              />
           
            </div>
            
            <div className="field-wrap" noValidate >
              <input 
              placeholder="Confirmez Mot de passe" 
              type="password"required 
              autoComplete="off"
              name="password2"
              /*onChange={e=>this.password2=e.target.value}*/
              value={user.password2}
              onChange={handleChange }
              />
            </div>
            

            <button method="post"  onClick={register}  className="button button-block">Valider</button>
            <p className="have-account"><a href="#">Vous avez un compte? connectez vous!</a></p>
            </form>

          
        </div>
        
  </div> 
  </>
      
    );

}

export default withRouter (Register)
