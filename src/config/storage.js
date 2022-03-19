const {REACT_APP_KEY_STORAGE: keyStorage} = process.env

export const saveToken = (token) => localStorage.setItem(keyStorage, JSON.stringify(token))

export const getToken = () => JSON.parse(localStorage.getItem(keyStorage)) 

export const removeToken = () => localStorage.removeItem(keyStorage)

export const cleanToken = () => localStorage.clear()

export const hasToken= () => getToken() !== null

export const isAuthenticated = () => hasToken()