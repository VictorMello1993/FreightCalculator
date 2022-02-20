import styled from "styled-components"

const Footer = () => {
  return (
    <footer>
    <FooterContent>
      Todos os direitos reservados a Freight Calculator © 2022
    </FooterContent>
    </footer>
  )
}

const FooterContent = styled.div `
  background-color: #335185;
  text-align: center;
  padding: 20px 12px;
  color: #fff; 
`

export default Footer