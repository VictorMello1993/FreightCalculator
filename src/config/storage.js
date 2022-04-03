const {REACT_APP_KEY_STORAGE: keyStorage} = process.env

export const saveAuth = (data) => localStorage.setItem(keyStorage, JSON.stringify(data))

export const getAuth = () => JSON.parse(localStorage.getItem(keyStorage)) 

export const removeToken = () => localStorage.removeItem(keyStorage)

export const cleanToken = () => localStorage.clear()

export const hasToken= () => getAuth() !== null

export const isAuthenticated = () => hasToken()