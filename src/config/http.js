import axios from "axios"

const {REACT_APP_API: api} = process.env
console.log('api', api)

const http = axios.create({
  baseURL: api
})

http.defaults.headers['content-type'] = 'application/json'

export default http;



