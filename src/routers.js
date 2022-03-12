import React from "react"
import { Router, Redirect } from "@reach/router"

//views
import Portal from './views/portal';
import Admin from './views/admin';
import { isAuthenticated } from "./config/storage";

const Login = () => <div>Login</div>

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