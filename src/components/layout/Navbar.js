import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import './HomeSection';
import './HomeSection.css';



export default class Navbar extends React.Component { 
  render(){
   
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
      
    <Link className="nav-button" to="/register"> 
    <button type="button" className="btn btn-info">Sign up</button>
    </Link>

    <Link className="nav-button" to="/login">
      <button type="button" className="btn btn-outline-info">Log in</button>
    </Link>
    
</div>
</div>
  );
}
}

