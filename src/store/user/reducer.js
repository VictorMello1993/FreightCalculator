//Estado inicial
const INITIAL_STATE = {
  data: [
    {
      id: 1,
      nome: 'Victor'
    }
  ]
}

// Alterador de estado que recebe estado inicial
const reducer = (state = INITIAL_STATE, action) => {
  return state
}

export default reducer