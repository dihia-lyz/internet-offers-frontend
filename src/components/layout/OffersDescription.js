import React,{ useState, useEffect } from 'react';
import '../pages/admin/AdminPage.css'
import axios from "axios";


function OffersDescription () {

const [ AdminData, setAdminData] = useState({     
  data_offers:{},
  internet:'',
  calls:'',
  duration:'',
  price:'',
  description:'',
  offers_loaded:false,
  offers_refresh:false,
  addOffer:false,
  updateOff:false,
  Updtinternet:'',
  Updtid:'',
  Updtcalls:'',
  Updtduration:'',
  Updtprice:'',
  Updtdescription:'',
 
});

const [refreshKey, setRefreshKey] = useState(0);
/*const [addOfferButton, handleAddOfferButton] = useState(false);*/
const handleAddOfferButton=async ()=>{
 
  console.log(AdminData.data_offers);
  let addd=AdminData.addOffer;
  await setAdminData({ addOffer: !addd});
  if(AdminData.addOffer===true){
  await setRefreshKey(refreshKey+1)
}}
     
const handleChange = e => {
  e.preventDefault();
    const { name, value } = e.target
    setAdminData({
        ...AdminData,
        [name]: value
    });
    
}
useEffect(() => {
axios.get("http://localhost:5000/api/getAllOffers")
      .then(res => {
          if(res.data.success===true){
          setAdminData({ offers_loaded: true,data_offers:res.data.data,offers_refresh:true });
          }else {
          setAdminData({ offers_loaded: false,data_offers:"Error in loading data" });
          }
      })
}, [refreshKey]);

       
      const addNewOffer = async() => {
      setAdminData({addOffer:!AdminData.addOffer})
      let offer={internet:AdminData.internet,
          calls:AdminData.calls,
          duration:AdminData.duration,
          price:AdminData.price,
          description:AdminData.description
      }
      await axios.post(`http://localhost:5000/api/AddOffer`,offer)
      .then(res => {
          if(res.data.success===true){
                setRefreshKey(refreshKey +1)
                console.log('zzz','',AdminData.data_offers);
          }else {
          console.log(res.data.message)
          }
      })
    }

     
     const DeleteOffer = (id) => {
      console.log('id=',id)
     
      axios.post(`http://localhost:5000/api/DeleteOffer?id=${id}`)
      .then(res => {
          if(res.data.success===true){
                setRefreshKey(refreshKey +1)             
          }else {
          console.log('error in deleting offer')
          }
      })
    }

    const loadUpdateData=(offerItem)=>{
      setAdminData({  updateOff:true,
                      Updtid:offerItem._id,
                      Updtinternet:offerItem.internet,
                      Updtcalls:offerItem.calls,
                      Updtdescription:offerItem.description,
                      Updtprice:offerItem.price,
                      Updtduration:offerItem.duration,
                    });
    }

    const editOffer=()=>{
      console.log('update')
      let offerToUpdate={
        id:AdminData.Updtid,
        internet:AdminData.Updtinternet,
        calls:AdminData.Updtcalls,
        duration:AdminData.Updtduration,
        price:AdminData.Updtprice,
        description:AdminData.Updtdescription
      }
      axios.post(`http://localhost:5000/api/UpdateOffer`,offerToUpdate)
      .then(res => {
          if(res.data.success===true){
                setRefreshKey(refreshKey +1)             
          }else {
          console.log('error in updating offer')
          }
      })
    }
  return (
      <>      
      <div class="input-content" id='Offers'>
            <h1>Offers</h1>

            <div className="offersContainer">
            {!AdminData.offers_refresh && !AdminData.offers_loaded ? <p></p> : 

            <table class="table table-bordered">
            <thead>

            <tr >
                <th class="bg-danger" ></th>
                <th  class="bg-danger" >INTERNET</th>
                <th class="bg-danger" >CALLS</th>
                <th class="bg-danger" >DURATION</th>
                <th class="bg-danger" >PRICE</th>
                <th class="bg-danger" >DESCRIPTION</th>
                <th class="bg-danger" ></th>
               
            </tr>
            </thead>
            <tbody>
            {    AdminData.data_offers.map((offer_item, i) =>
            <tr>

                <td >{offer_item._id}</td>
                <td>{offer_item.internet}</td>
                <td>{offer_item.calls}</td>
                <td>{offer_item.duration}</td>
                <td>{offer_item.price}</td>
                <td>{offer_item.description}</td>
                <td> <button className="deletebtn" onClick={(event)=>DeleteOffer(offer_item._id)}>
                    <i className="fas fa-trash"></i>
                    </button>
                    <button className="updatebtn" onClick={(event)=>loadUpdateData(offer_item)}>
                    <i className="fas fa-pen"></i>
                    </button>
                </td>
            </tr>
            )}
            </tbody>
            </table>}
            
            </div>
            <button id='btn_show_add' class="btn btn-info" onClick={handleAddOfferButton}>+</button>

            { !AdminData.addOffer ? null : 

    <div class="input-content-wrap">
      <dl class="inputbox">
        <dt class="inputbox-title">Internet</dt>
        <dd class="inputbox-content">
          <input id="input0" type="text"  name="internet" value={AdminData.internet} onChange={handleChange }/>
          <label htmlFor="input0">Internet</label>
          <span class="underline"></span>
        </dd>
      </dl>
      <dl class="inputbox">
        <dt class="inputbox-title">Calls</dt>
        <dd class="inputbox-content">
          <input id="input1" type="text"  name="calls" value={AdminData.calls}  onChange={handleChange }/>
          <label htmlFor="input1">Calls</label>
          <span class="underline"></span>
        </dd>
      </dl>
      <dl class="inputbox">
        <dt class="inputbox-title">Duration</dt>
        <dd class="inputbox-content">
          <input id="input2" type="text"  name="duration" value={AdminData.duration}  onChange={handleChange }/>
          <label htmlFor="input2">Duration</label>
          <span class="underline"></span>
        </dd>
      </dl>
      <dl class="inputbox">
        <dt class="inputbox-title">Price</dt>
        <dd class="inputbox-content">
          <input id="input3" type="text"  name="price" value={AdminData.price}  onChange={handleChange }/>
          <label htmlFor="input3">Price</label>
          <span class="underline"></span>
        </dd>
      </dl>
      <dl class="inputbox">
        <dt class="inputbox-title">Description</dt>
        <dd class="inputbox-content">
          <input id="input4" type="text"  name="description" value={AdminData.descrription}  onChange={handleChange }/>
          <label htmlFor="input4">Description</label>
          <span class="underline"></span>
        </dd>
      </dl>
      <div class="btns">
          <button id='btn_add' class="btn btn-info" onClick={addNewOffer}  onChange={handleChange }>Add new offer</button>
      </div>
    </div>
            }


{(!AdminData.updateOff) ? null :
  <div class="input-content-container">
  <h1 className="dd">Update offer</h1>
  <dl class="inputbox">
        <dt class="inputbox-title">Internet</dt>
        <dd class="inputbox-content">
          <input  type="text"  name="Updtinternet" value={AdminData.Updtinternet} onChange={handleChange }/>
          <span class="underline"></span>
        </dd>
      </dl>
      <dl class="inputbox">
        <dt class="inputbox-title">Calls</dt>
        <dd class="inputbox-content">
          <input  type="text"  name="Updtcalls" value={AdminData.Updtcalls}  onChange={handleChange }/>
          <span class="underline"></span>
        </dd>
      </dl>
      <dl class="inputbox">
        <dt class="inputbox-title">Duration</dt>
        <dd class="inputbox-content">
          <input  type="text"  name="Updtduration" value={AdminData.Updtduration}  onChange={handleChange }/>
          <span class="underline"></span>
        </dd>
      </dl>
      <dl class="inputbox">
        <dt class="inputbox-title">Price</dt>
        <dd class="inputbox-content">
          <input  type="text"  name="Updtprice" value={AdminData.Updtprice}  onChange={handleChange }/>
          <label htmlFor="input3">Price</label>
          <span class="underline"></span>
        </dd>
      </dl>
      <dl class="inputbox">
        <dt class="inputbox-title">Description</dt>
        <dd class="inputbox-content">
          <input  type="text"  name="Updtdescription" value={AdminData.Updtdescription}  onChange={handleChange }/>
          <span class="underline"></span>
        </dd>
      </dl>
      <div class="btns">
          <button id='btn_update' class="btn btn-info" onClick={editOffer}  onChange={handleChange }>Save changes</button>
      </div>
  </div>
}
            
</div>
      </>
    )
}

export default OffersDescription