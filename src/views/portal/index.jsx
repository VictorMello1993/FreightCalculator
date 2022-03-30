import { Router } from '@reach/router';
import Layout from './../../components/layout/index';

// Rotas de views
import Home from './home';

const Portal = () => {
  return (
    <Layout>
      <Router>
        <Home path="/" />
      </Router>
    </Layout>
  )
}

export default Portal