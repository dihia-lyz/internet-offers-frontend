import React,{useState,useEffect} from 'react';
import UserNavBar from '../../layout/UserNavbar';
import './UserPage.css';

import axios from 'axios';

function SubscriptionPage() {
    const [userData,setUserData]=useState({
        userr:{},
        userRefresh:true,
    })

    const [subs,setSubs]=useState({ 
        subscriptions:'',
        errors:'',
        loading:false,
        offerList:[],
        refresh:0,
        index:0,
        })
    var newArray=[];


   
    useEffect(() => {
        const tokenn=localStorage.getItem("token");
        //get user data to show it n user page
        if(tokenn!== null){
             console.log('t2',tokenn);
             axios.get(`http://localhost:5000/api/verify?token=${tokenn}`)
                 .then(res =>{
                 if(res.data.success===true){                    
                     axios.get(`http://localhost:5000/api/getUser?token=${tokenn}`)
                     .then(res=>{
                         setUserData({userr:res.data.user})
                        })
                    }
                   
         })
        }else {
            setUserData({userRefresh:!userData.userRefresh})
         }
     } , [userData.userRefresh])


    useEffect(() => {
        if(typeof userData.userr!== 'undefined'){
            axios.get(`http://localhost:5000/api/getSubscriptions?userid=${userData.userr._id}`)
            .then(res=>{
                if(res.data.success===false){
                    setSubs({refresh:subs.refresh+1})
                }
                else{
                    setSubs({subscriptions:res.data.subs})
                    if(res.data.subs){
                    res.data.subs.forEach(element => {
                    axios.get(`http://localhost:5000/api/getOfferById?offerid=${element.OfferId}`)
                    .then(res=>{
                        if(res.data.success===false){
                        setSubs({errors:res.data.message})
                        setSubs({refresh:subs.refresh+1})
                        }
                        else{
                            let off={calls:res.data.offers.calls,
                            internet:res.data.offers.internet,
                            duration:res.data.offers.duration,
                            price:res.data.offers.price,
                            description:res.data.offers.description
                                    }
                            newArray.push(off)
                            setSubs({offerList:[...subs.offerList || [],newArray[subs.index]]})
                            setSubs({index:subs.index+1})

                            }
                        })

                    });
                    
                setSubs({loading:true})
               
                } }
        })   
       
        }else {
            setSubs({refresh:subs.refresh+1})
        }
   
    
}, [subs.refresh])

    return (
        <>
        <UserNavBar />
        <h1 className="userTitle" style={{color:"#555"}}>Welcome to your space <br/>{!userData.userr ?  null : userData.userr.firstName} { !userData.userr ?  null : userData.userr.lastName} !</h1>
        <div className="UserSpace">
            <h2 >Your subscriptions</h2>
            <div className="cards" style={{top:"40px"}}>
            {   console.log('dd',newArray)}

               { !subs.loading ? <h2>Loading ...</h2> : 
                 newArray.length>0 && newArray.map((offer, i) =>{
                    return (
               <h1>gg</h1>
               )
                /*subs.errors ? <h2>{subs.errors}</h2> : */
                //typeof  newArray !== 'undefined' && newArray.map((offer, i) =>{
                      //  return (
                          //  <h1>hahaa</h1>
                        /*<div className="card card-0" style={{width:"80%", height:"100px"}}>
                        <div class="card__icon"> ggg</div>
                        <h3 class="card__title">{offer.internet}+ {offer.calls}</h3>
    </div>*/
                        //)}
                        //)
                    })}

            </div>
        </div>
        </>
    )
}

export default SubscriptionPage
