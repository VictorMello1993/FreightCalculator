import axios from "axios"
import { removeToken, getAuth } from "./storage"
import {navigate} from '@reach/router'

const {REACT_APP_API: api} = process.env
console.log('api', api)

//Criando uma instância única de Axios para todas as requisições que forem realizadas na aplicação
const http = axios.create({
  baseURL: api
})

http.defaults.headers['content-type'] = 'application/json'

if(getAuth()){
  const {token} = getAuth()
  http.defaults.headers['authorization'] = token
}

//Interceptando a resposta caso o token expire
http.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401:
        removeToken()
        navigate('/login')
        break;
      default:
        return Promise.reject(error)
    }
  }
)

export default http;



