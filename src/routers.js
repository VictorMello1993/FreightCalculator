import React from "react"
import { Router, Redirect } from "@reach/router"
import { isAuthenticated } from "./config/storage";

//views
import Portal from './views/portal';
import Admin from './views/admin';
import Login from './views/auth/login';

//Se o usuário estiver na página admin e não tiver autenticado, redirecionar para a página de login
const PrivateRoute = ({component: Component, ...rest}) => {
  if(!isAuthenticated()){
    return <Redirect to="/login" noThrow />
  }
  return <Component {...rest}/>
}

//Se o usuário estiver na página login e não tiver autenticado, não redirecionar para lugar nenhum, o usuário fica na página de login
const Authenticated = ({component: Component, ...rest}) => {
  if(isAuthenticated()){
    return <Redirect to="/admin" noThrow/>    
  }
  return <Component {...rest}/>    
}

const Routers = () => {  
  return (
    <Router>
      <Portal path="/*" />
      <PrivateRoute path="/admin/*" component={Admin}/>      
      <Authenticated path="/login" component={Login} />
    </Router>
  )
}

export default Routers