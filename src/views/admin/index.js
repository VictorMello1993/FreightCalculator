import { Router } from '@reach/router';
import LayoutAdmin from '../../components/layout/admin';

// Rotas de views
import Home from './home';

const Admin = () => {
  return (
    <LayoutAdmin>
      <Router>
        <Home path="/" />
      </Router>
    </LayoutAdmin>
  )
}

export default Admin