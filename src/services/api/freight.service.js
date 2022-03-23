import axios from 'axios';
import * as xml2js from 'xml2js'
import dataServicos from '../../storage/tipos-servico.json'
import dataStates from '../../storage/estados-municipios.json'
import http from '../../config/http'

export function calcularPrecoFrete(values){
  return http.post('/', values)
}

export function obterTiposServico(){
  return dataServicos.servicos.map(({codigo, descricao}) => ({
    codigo, 
    descricao
  }))
}

export function obterEstados(){
  return dataStates.estados.map(({sigla, nome}) => ({
    sigla,
    nome
  }))
}

export function obterCidades(sigla){
  return dataStates.estados.find(estado => estado.sigla === sigla)?.cidades
}

