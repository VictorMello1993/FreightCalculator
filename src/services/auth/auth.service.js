import http from './../../config/http';

// export const authenticatedUser = (values) => http.post('/login', values)
export const authenticatedUser = (values) => {
  const {email, password} = values;  
  
  return http.post('/auth/local', {
    identifier: email,
    password
  })
} 

  

  