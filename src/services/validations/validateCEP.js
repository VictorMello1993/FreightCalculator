import { rangeCepPorEstado, formatCep } from "../../utils/helpers"

export  const validate = (data) => {
  const errors = {}    

  const {cepRemetente, cepDestinatario, estadoRemetente, estadoDestinatario} = data

  if (cepRemetente && !validarCepPorEstado(cepRemetente, estadoRemetente)) {
    errors.cepRemetente = 'CEP inválido'
  }    

  if (cepDestinatario && !validarCepPorEstado(cepDestinatario, estadoDestinatario)) {
    errors.cepDestinatario = 'CEP inválido'
  }

  return errors

}

const validarCepPorEstado = (cep, siglaEstado) => {    
  const cepFormatado = formatCep(cep)
  return Number(cepFormatado).isBetween(...rangeCepPorEstado[siglaEstado])
} 
