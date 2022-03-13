import React from "react"
import { Router, Redirect } from "@reach/router"
import { isAuthenticated } from "./config/storage";

//views
import Portal from './views/portal';
import Admin from './views/admin';
import Login from './views/auth/login';

const PrivateRoute = ({component: Component, ...rest}) => {
  if(!isAuthenticated()){
    return <Redirect to="/login" noThrow />
  }
  return <Component {...rest}/>
}

const Routers = () => {  
  return (
    <Router>
      <Portal path="/*" />
      <PrivateRoute path="/admin/*" component={Admin}/>
      <Login path="/login" />
    </Router>
  )
}

export default Routers