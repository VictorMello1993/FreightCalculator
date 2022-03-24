import { Router } from '@reach/router';
import LayoutAdmin from '../../components/layout/admin';

// Rotas de views
import Home from './home';
import Quotes from './quotes';
import Profile from './profile';

const Admin = () => {
  return (
    <LayoutAdmin>
      <Router>
        <Home path="/" />
        <Quotes path="cotacoes" />
        <Profile path="perfil" />
      </Router>
    </LayoutAdmin>
  )
}

export default Admin