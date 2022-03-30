import { useEffect } from 'react';
import { Container } from '../../components/freightCalculator/styles';
import http from '../../config/http'
import { getToken } from '../../config/storage';

const Home = () => {
  useEffect(() => {
    (async () => {
      const getUsers = await http.get('/users')
      console.log('getUsers', getUsers.data)
    }
    )()
  }, [])

  return (
    <Container>
      <h2>Está é a página privada</h2>
    </Container>
  )
}

export default Home;