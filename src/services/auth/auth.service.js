import http from './../../config/http';

// export const authenticatedUser = (values) => http.post('/login', values)
export const authenticatedUser = (values) => http.post('/auth/local', values)

  

  