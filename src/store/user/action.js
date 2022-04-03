import { navigate } from '@reach/router'
import http from '../../config/http'
import { saveAuth } from '../../config/storage'
import { authenticatedUser } from '../../services/auth/auth.service'
import { AUTH } from '../Types'

export const LoginAction = (values) => {
  return async (dispatch) => {
    dispatch({ type: AUTH.loading, status: true })

    const {data} = await authenticatedUser(values)
    const dataFormat = {token : `bearer ${data.jwt}`, user: data.user}

    saveAuth(dataFormat)

    http.defaults.headers['authorization'] = dataFormat.token
    
    dispatch({
      type: AUTH.login, 
      data: dataFormat
    })  
    navigate('/admin')  
  }
}