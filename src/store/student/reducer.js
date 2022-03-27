//Estado inicial
const INITIAL_STATE = {
  data: [
    {id: 1, nome: 'Pedro'},
    {id: 2, nome: 'Liniquer'},
    {id: 3, nome: 'Maria'}
  ],
  loading: false
}

// Alterador de estado que recebe estado inicial
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_USER':

      const simulateNewUser = {id: 98, nome: 'Ciclano'}
      const data = [...state.data, simulateNewUser]
      return {
        ...state,
        data
      }
    default:
      return state
  }
}

export default reducer