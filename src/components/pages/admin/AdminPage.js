import React from 'react';
import './AdminPage.css';
import AdminNavBar from '../../layout/AdminNavbar';
import UserDescription from '../../layout/UserDescription';
import OffersDescription from '../../layout/OffersDescription';


function  AdminPage () {       
    return (
        <>

        <AdminNavBar />

        <div className="HomePageAdmin">
            <h1 className="titleADmin">
            ADMIN PANEL
            </h1>
            <div className="grid-container">
                <div className="grid-item" id='item1'>Users</div>
                <div className="grid-item" id='item2'>Offers</div>
                <div className="grid-item" id='item3' >Invoices</div>
                <div className="grid-item" id='item4'>subscription</div>
           
            </div>
        </div>


        <UserDescription/>
        <OffersDescription/>
        
       
        </>
    )
}

export default AdminPage
