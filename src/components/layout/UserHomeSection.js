import React ,{useEffect,useState}from 'react';
import '../pages/user/UserPage.css';
import axios from 'axios';

function UserHomeSection({CurrentUser}) {



    return (
        <>
            <div className="userSection">
                <h1 className="userTitle">Hello {!CurrentUser ?  null : CurrentUser.firstName} { !CurrentUser ?  null : CurrentUser.lastName} !</h1>                
            </div>
        </>
    )
}

export default UserHomeSection
