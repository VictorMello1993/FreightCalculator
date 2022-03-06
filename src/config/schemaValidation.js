import * as Yup from 'yup';

export default Yup.object().shape({
  cepRemetente: Yup.string().required('CEP do remetente é obrigatório'),
  cepDestinatario: Yup.string().required('CEP do destinatário é obrigatório'),                             
  peso: Yup.number().required('Peso é obrigatório'),
  diametro: Yup.number().required('Diâmetro é obrigatório'),  
  largura: Yup.number().required('Largura é obrigatória'),  
  altura: Yup.number().required('Altura é obrigatória'),  
  comprimento: Yup.number().required('Comprimento é obrigatório'),  
  servico: Yup.number().required('É preciso selecionar o tipo de serviço'),  
  formato: Yup.number().required('É preciso selecionar o formato da encomenda'),  
  estadoRemetente: Yup.string().required('É preciso selecionar o estado'),
  cidadeRemetente: Yup.string().required('É preciso selecionar a cidade'),  
  estadoDestinatario: Yup.string().required('É preciso selecionar o estado'),
  cidadeDestinatario: Yup.string().required('É preciso selecionar a cidade'),  
})