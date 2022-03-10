import axios from 'axios';
import * as xml2js from 'xml2js'
import dataServicos from '../../storage/tipos-servico.json'
import dataStates from '../../storage/estados-municipios.json'

const BASE_URL = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem=';

export async function calcularPrecoFrete({ cepRemetente, cepDestinatario, peso, formato, comprimento, altura, largura, servico, diametro }) {

  const response = await axios.get(`${BASE_URL}${cepRemetente}&sCepDestino=${cepDestinatario}&nVlPeso=${peso}&nCdFormato=${formato}&nVlComprimento=${comprimento}&nVlAltura=${altura}&nVlLargura=${largura}&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=${servico}&nVlDiametro=${diametro}&StrRetorno=xml&nIndicaCalculo=3`)    

  let json = {}

  xml2js.parseString(response.data, (err, res) => {

    if(err){
      throw new Error(err.message)
    }

    json = res
  })      

  return json
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

