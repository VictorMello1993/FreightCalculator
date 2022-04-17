import { Nav, NavItem, NavLink } from "reactstrap"
import styled from 'styled-components';

const LoginLink = ({ ...props }) => {
  return (
    <Nav>
      <NavItem>
        <LoginNav {...props}>
          Login
        </LoginNav>
      </NavItem>
    </Nav>
  )
}

const LoginNav = styled(NavLink)`
  font-size: 20px;
  color: #335185;  
`

export default LoginLink