import styled from 'styled-components';

const Result = ({data}) => {
  console.log(data)
  return(
    <ResultContainer>
      <Item>Estado do remetente: {data?.estadoRemetente}</Item>
      <Item>Cidade do remetente: {data?.cidadeRemetente}</Item>
      <Item>Estado do destinatário: {data?.estadoDestinatario}</Item>
      <Item>Cidade do destinatário: {data?.cidadeDestinatario}</Item>
      <Item>Cep Remetente: {data?.cepRemetente}</Item>
      <Item>Formato: {data?.cepDestinatario}</Item>
      <Item>Comprimento: {data?.comprimento}</Item>
      <Item>Altura: {data?.altura}</Item>
      <Item>Largura: {data?.largura}</Item>
      <Item>Diametro: {data?.diametro}</Item>
      <Item>Tipo de serviço: {data?.servico}</Item>      
    </ResultContainer>
  )    
}

const ResultContainer = styled.div`
  background-color: #e9d8a6;
  padding: 10px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const Item = styled.div`
  flex: 1;
`

export default Result;