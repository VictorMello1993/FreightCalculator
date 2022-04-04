import styled from "styled-components"
const Footer = () => {
  return (
    <FooterContainer>
      <div>
        Todos os direitos reservados a Freight Calculator © 2022
      </div>      
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background-color: #335185;
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
  padding: 20px 12px;
  color: #fff;  
`

export default Footer