import axios from 'axios';
import * as xml2js from 'xml2js'
import dataServicos from '../../storage/tipos-servico.json'
import dataStates from '../../storage/estados-municipios.json'

export async function calcularPrecoFrete({ cepRemetente, cepDestinatario, peso, formato, comprimento, altura, largura, servico, diametro }) {

  const args = {
    sCepOrigem: cepRemetente,
    sCepDestino: cepDestinatario,
    nVlPeso: peso,
    nCdFormato: formato,
    nVlComprimento: comprimento,
    nVlAltura: altura,
    nVlLargura: largura,
    nCdServico: servico,
    nVlDiametro: diametro,
  }  

  const response = await axios.get('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=08082650&sDsSenha=564321&sCepOrigem=70002900&sCepDestino=04547000&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3')    

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
  return dataServicos.servicos.map(({id, codigo, descricao}) => ({
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

