import axios from "axios"
import { removeToken } from "./storage"
import {navigate} from '@reach/router'

const {REACT_APP_API: api} = process.env
console.log('api', api)

const http = axios.create({
  baseURL: api
})

http.defaults.headers['content-type'] = 'application/json'

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



