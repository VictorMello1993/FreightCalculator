import styled from 'styled-components';

const Result = ({data: {valorFrete, diasUteis}}) => {  
  return(
    <ResultContainer>   
      <Item>O valor do frete é de R${valorFrete} e o prazo de entrega é de {diasUteis} dia(s) úteis.</Item>      
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