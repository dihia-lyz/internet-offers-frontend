import React,{useState,useEffect} from 'react';
import '../pages/user/UserPage.css';
import axios from "axios";


function UserOffers({CurrentUser}) {
  const [UserOffer,setUserOffer]=useState({
    offers_loaded:false,
    data:{}
  })
  useEffect(() => {

    axios.get("http://localhost:5000/api/getAllOffers")
          .then(res => {
              if(res.data.success===true){
                setUserOffer({ offers_loaded: true,data:res.data.data });
                console.log('offers loaded ');
              }else {
                setUserOffer({ offers_loaded: false,data:"Error in loading data" });
              }
          })
    }, []);

const Subscribe =(offerid)=>{
    let params={userid:CurrentUser._id,offerid:offerid,email:CurrentUser.email}
    axios.post("http://localhost:5000/api/AddSubscription", params)
    .then(res => {
        if(res.data.success===true){
        console.log('Subscription added ');
        }else {
        console.log('Subscription error ');

        }
    })
   }
    return (
        <>
        <div class="cards">

        {!UserOffer.offers_loaded ? null :
        UserOffer.data.map((offer_item, i) =>

          <div className={"card card-"+i }>
            <div class="card__icon">{i+1}</div>
            <h2 class="card__title">{offer_item.internet} of internet + {offer_item.calls} of calls in {offer_item.duration} for {offer_item.price} </h2>
            <button className="btn btn-info card__apply" onClick={(event)=>Subscribe(offer_item._id)}>
                Subscribe
            </button>
          </div>
          )
        }
   
  </div>
            
        </>
    )
}

export default UserOffers
