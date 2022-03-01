import * as correios from 'correios-brasil'
import axios from 'axios';

// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export default function calcularPrecoFrete({ cepRemetente, cepDestinatario, peso, formato, comprimento, altura, largura, servico, diametro }) {

  // const args = {
  //   sCepOrigem: cepRemetente,
  //   sCepDestino: cepDestinatario,
  //   nVlPeso: peso,
  //   nCdFormato: formato,
  //   nVlComprimento: comprimento,
  //   nVlAltura: altura,
  //   nVlLargura: largura,
  //   nCdServico: servico,
  //   nVlDiametro: diametro,
  // }  

  //TESTE
  let args = {  
    sCepOrigem: '81200100',
    sCepDestino: '21770200',
    nVlPeso: '1',
    nCdFormato: '1',
    nVlComprimento: '20',
    nVlAltura: '20',
    nVlLargura: '20',
    nCdServico: ['04014', '04510'], //Array com os códigos de serviço
    nVlDiametro: '0',
  };

  correios.calcularPrecoPrazo(args).then(response => console.log(response))
  
  // axios.get('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=81200100&sCepDestino=21770200&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nVlDiametro=0&nCdServico=04014&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=json&nIndicaCalculo=3',
  //   {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     }
  //   }).then(response => console.log(response))

  // axios.post('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx', args, {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Credentials": "true",
  //     "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,POST,DELETE",
  //     "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept",
  //   }
  // }).then(response => console.log(response))
  
  // axios.get('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx', args)
  //   .then(response => console.log(response))

  // axios.get('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=81200100&sCepDestino=21770200&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nVlDiametro=0&nCdServico=04014&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3')
  //   .then(response => console.log(response))

  // http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=81200100&sCepDestino=21770200&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nVlDiametro=0&nCdServico=04014&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3
  // correios.calcularPrecoPrazo(args).then((response) => {
  //   console.log(response)
  // })
}

