import styled from 'styled-components';
import { BiPackage } from "react-icons/bi";

const Header = () => {
  return (    
    <HeaderContent>
      <Icon/>
      FREIGHT CALCULATOR
    </HeaderContent>    
  )
}

const HeaderContent = styled.header `
    padding: 25px;    
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;    
    font-weight: 800;    
    font-size: 35px;
    color: #335185;    
`

const Icon = styled(BiPackage) `
  font-size: 60px;
  color: #335185;
`

export default Header