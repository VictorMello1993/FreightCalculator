import http from './../../config/http';

export const authenticatedUser = (values) => http.post('/login', values)