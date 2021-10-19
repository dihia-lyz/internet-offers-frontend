import React,{ useState, useEffect } from 'react';
import '../pages/admin/AdminPage.css'
import axios from "axios";

function UserDescription () {

const [ AdminData, setAdminData] = useState({     
  loaded: false,
  data:{},
  length:0,
  refresh:false

});

const [refreshKey, setRefreshKey] = useState(0);

     
useEffect(() => {
console.log('eee',refreshKey)
axios.get("http://localhost:5000/api/getAllUsers")
      .then(res => {
          if(res.data.success===true){
          setAdminData({ loaded: true,data:res.data.data,length:res.data.length,refresh:true });
          
          }else {
          setAdminData({ loaded: false,data:"Error in loading data" });
          }
      })
}, [refreshKey]);
       
   const Delete = (email) => {
      console.log('okk');
      axios.post(`http://localhost:5000/api/DeleteUser?email=${email}`)
      .then(res => {
          if(res.data.success===true){
                setRefreshKey(refreshKey +1)             
          }else {
          console.log('error in deleting user')
          }
      })
    }

     
  return (
      <>      
      <div className='UsersSection'>
      <h1 className='UsersSectionTitle'>USERS LIST</h1>
          <div className="UsersConainer">
              {!AdminData.refresh && !AdminData.loaded  ? <p className='Loading ...'>Error</p> :                
              <table id="customers" >
                 <thead>
              <tr>
                  <th>ID</th>
                  <th>EMAIL</th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
              </tr>  
               </thead>  
           
               <tbody>                  
                      {    AdminData.data.map((user, i) =>
                          <tr >
                              <td>{user._id}</td>
                              <td>{user.email}</td>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
                              <td><button type="button" onClick={(event)=>Delete(user.email)} className="btn btn-danger">Delete</button>
                              </td>
                          </tr>)
                      }
                 </tbody>  
              </table>
              }           

          </div>
      </div>
      </>
    )
}

export default UserDescription