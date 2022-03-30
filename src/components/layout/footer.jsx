import styled from "styled-components"
import { navigate } from '@reach/router';
import { Button } from "reactstrap";

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        Todos os direitos reservados a Freight Calculator © 2022
      </div>
      <Button onClick={() => navigate('/login')}>Login</Button>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background-color: #335185;
  display: flex;
  width: 100%;
  justify-content: space-between;
  text-align: center;
  padding: 20px 12px;
  color: #fff;  
`

export default Footer