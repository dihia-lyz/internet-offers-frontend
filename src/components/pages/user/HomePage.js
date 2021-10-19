import React,{useState,useEffect} from 'react';
import UserNavBar from '../../layout/UserNavbar';
import UserOffers from '../../layout/UserOffers';
import UserHomeSection from '../../layout/UserHomeSection';
import axios from 'axios';

function HomePage() {

    const [userr,getUser]=useState()

    useEffect(() => {
     console.log('t2',2222);
   
       const tokenn=localStorage.getItem("token");
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
   
       }, [])

    return (
        <>
        <UserNavBar />
        <UserHomeSection CurrentUser={userr} />
        <UserOffers CurrentUser={userr} />

            
        </>
    )
}

export default HomePage
