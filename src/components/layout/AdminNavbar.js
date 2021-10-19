import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Navbar.css';
import './HomeSection';
import './HomeSection.css';
import { useHistory } from "react-router-dom";
import axios from "axios";


export default function AdminNavbar ({setLoginToken}){ 
  const history = useHistory()

 
    const logout=()=>{
      
      const token=localStorage.getItem("token");
            
      axios.post(`http://localhost:5000/api/logout?token=${token}`)
      .then(res=>{ 
            if(res.data.success===true){
                try{setLoginToken({});} catch(e){console.log(e)}
                localStorage.setItem("token",'');
                history.push("/register");      
            }})
      }
   
  return(
  <div className="nav">
  <input type="checkbox" id="nav-check"/>
  <div className="nav-header">
    <div className="nav-title">
      LogoApp
    </div>
  </div>
  <div className="nav-btn">
    <label htmlFor="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div className="nav-links">
    <Link className="nav-item" to="/#">Home</Link>
    <Link className="nav-item" to="/#">Users</Link>
    <Link className="nav-item" to="/#">Offers</Link>
    <Link className="nav-item" to="/#Subscription">Subsciption</Link>
    <Link className="nav-button" to="/register"> 
    <button type="button" onClick={logout} className="btn btn-info">Log out</button>
    </Link>

    
</div>
</div>
  );
}

