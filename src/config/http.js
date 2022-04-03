import axios from "axios"
import { removeToken, getAuth } from "./storage"
import {navigate} from '@reach/router'

const {REACT_APP_API_LOCATION: apiLocation, REACT_APP_API: apiLocal, REACT_APP_API_STRAPI: apiStrapi} = process.env
console.log('apiLocal', apiLocal)
console.log('apiStrapi', apiStrapi)

//Criando uma instância única de Axios para todas as requisições que forem realizadas na aplicação
const http = axios.create({
  baseURL: apiLocation === 'local' ? apiLocal : apiStrapi
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



