import { rangeCepPorEstado, formatCep } from "../../utils/helpers"

export default function validarCepPorEstado(cep, siglaEstado){    
  const cepFormatado = formatCep(cep)
  return Number(cepFormatado).isBetween(...rangeCepPorEstado[siglaEstado])
} 
