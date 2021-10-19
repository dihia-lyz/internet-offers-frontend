import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Home from "./components/pages/Home";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { useState } from 'react';
import HomePage from "./components/pages/user/HomePage";
import AdminPage from "./components/pages/admin/AdminPage";
import Subscription from "./components/pages/user/SubscriptionPage";



function App () {
     
  let [ token, setLoginToken] = useState();

  console.log('rrrr',token);
  

return (
       
      <Router>
        <Switch>
       

        <Route  exact path="/">
        <Home />
        </Route> 

        <Route   path="/login"> {token ? <HomePage setLoginToken={setLoginToken}  { ...console.log('homepage token=',token) }  />
        : <Login setLoginToken={setLoginToken}  { ...console.log('login token=',token)}/>}
        </Route>

       
          <Route path="/register">
            <Register setLoginToken={setLoginToken} { ...console.log('register token=',token)} />
        </Route>
       

        <Route path="/login"><Login  setLoginToken={setLoginToken} /> </Route> 
        <Route   path="/HomePage"> {token ? <HomePage setLoginToken={setLoginToken} { ...console.log('homepage2 token=',token) }  />
        : <Redirect to="/register" { ...console.log('login token=',token)} /> }
        </Route>

        <Route   path="/AdminPage"> {token ? <AdminPage setLoginToken={setLoginToken} { ...console.log('admin token=',token) }  />
        : <Redirect to="/register" { ...console.log('login token=',token)} /> }
        </Route>

        <Route   path="/AdminPage"> {token ? <AdminPage setLoginToken={setLoginToken} { ...console.log('admin token=',token) }  />
        : <Redirect to="/register" { ...console.log('login token=',token)} /> }
        </Route>
       
        <Route   path="/Subscription"> {token ? <Subscription setLoginToken={setLoginToken} { ...console.log('Subscription token=',token) }  />
        : <Redirect to="/register" { ...console.log('login token=',token)} /> }
        </Route>

       
        
        </Switch>
      </Router>
      
    
    );
  }

export default App;