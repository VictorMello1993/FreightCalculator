import { Router } from '@reach/router';

// Rotas de views
import Home from './home';

const Admin = () => {
  return (
   <Router>
     <Home path="/"/>
   </Router>
 ) 
}

 export default Admin