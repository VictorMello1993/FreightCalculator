import http from './../../config/http';

// export const authenticatedUser = (values) => http.post('/login', values)
export const authenticatedUser = (values) => {
  const {email, password} = values;

  const url  = process.env.REACT_APP_API_LOCATION === 'local' ? '/login' : '/auth/local';
  
  const credentials = process.env.REACT_APP_API_LOCATION === 'local' ? {
    email,
    password
  } : {
    identifier: email,
    password
  };

  return http.post(url, credentials)
} 

  

  