import styled from "styled-components"

const Footer = () => {
  return (
    <FooterContent>
      Todos os direitos reservados a Freight Calculator © 2022
    </FooterContent>
  )
}

const FooterContent = styled.footer `
  background-color: #335185;
  text-align: center;
  padding: 20px 12px;
  color: #fff; 
`

export default Footer