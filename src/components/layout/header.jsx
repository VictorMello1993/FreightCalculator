import styled from 'styled-components';
import { BiPackage } from "react-icons/bi";
import { Link, navigate } from '@reach/router';
import LoginLink from '../loginLink/header';

const Header = () => {
  return (
    <HeaderContainer>
      <BoxIcon>
        <Icon />
        FREIGHT CALCULATOR
      </BoxIcon>
      <BoxNav>
        <LoginLink tag={Link} to="/login" onClick={() => navigate('/login')}/>        
      </BoxNav>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
    padding: 25px;    
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;    
    font-weight: 800;    
    font-size: 35px;
    color: #335185;  
`

const Icon = styled(BiPackage)`
  font-size: 60px;
  color: #335185;
`

const BoxNav = styled.div`
  margin-left: 0 auto;
`

const BoxIcon = styled.div`
  flex: 1;
`

export default Header;