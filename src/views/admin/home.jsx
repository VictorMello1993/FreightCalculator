import { useEffect } from 'react';
import { Container } from '../../components/freightCalculator/styles';
import http from '../../config/http'
import { getToken } from '../../config/storage';

const Home = () => {
  useEffect(() => {
    (async () => {
      const {type, token} = getToken()      
      const getUsers = await http.get('/users', {
        headers: {
          authorization: `${type} ${token}`
        }
      })
      console.log('getUsers', getUsers.data)            
    })()
  }, [])
  
  return (
    <Container>
      <h2>Está é a página privada</h2>
    </Container>
  )
}

export default Home;