import { AUTH } from "../Types";

//Estado inicial
const INITIAL_STATE = {
  data: [
    {
      id: 1,
      nome: 'Victor'
    },
  ],
  loading: false,
  auth: {},
}

// Alterador de estado que recebe estado inicial
const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH.loading:
      state.loading = action.status || false
      return state
    case AUTH.login:
       state.loading = false
       state.auth = action.data
       return state
    default:
      return state 
  }
}

export default reducer