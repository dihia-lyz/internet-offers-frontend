import React from "react";
import { Link } from "react-router-dom";
import './HomeSection.css';

class HomeSection extends React.Component { 
  render() {
    return (
    
    <div className='hero-container'>
    
      <h1>LES MEILLEURS FORFAITS INTERNET</h1>
      <p>Souscrivez vous à un forfait Internet et profitez pleinement d'offres</p>
      <div className='hero-btns'>
      <Link  to="/register" >
      <button type="button" className="btn btn-light">Voir plus</button>
      </Link>
      </div>


      
    </div>
  );
}}
export default HomeSection