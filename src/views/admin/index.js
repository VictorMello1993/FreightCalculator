import { Router } from '@reach/router';
import LayoutAdmin from '../../components/layout/admin';

// Rotas de views
import Home from './home';
import Profile from './profile';
import FreightList from './quotes';

const Admin = () => {
  return (
    <LayoutAdmin>
      <Router>
        <Home path="/" />    
        <FreightList path="fretes"/>
        <Profile path="perfil" />
      </Router>
    </LayoutAdmin>
  )
}

export default Admin