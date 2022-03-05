import axios from 'axios';
import * as xml2js from 'xml2js'

export default async function calcularPrecoFrete({ cepRemetente, cepDestinatario, peso, formato, comprimento, altura, largura, servico, diametro }) {

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

  const response = await axios.get(`http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=${args.sCepOrigem}&sCepDestino=${args.sCepDestino}&nVlPeso=${args.nVlPeso}&nCdFormato=${args.nCdFormato}&nVlComprimento=${args.nVlComprimento}&nVlAltura=${args.nVlAltura}&nVlLargura=${args.nVlLargura}&nVlDiametro=${args.nVlDiametro}&nCdServico=${args.nCdServico}&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`)

  xml2js.parseString(response.data, (err, res) => {

    if(err){
      throw new Error(err.message)
    }

    const json = JSON.stringify(res)   
    return JSON.parse(json)    
  })    
}
