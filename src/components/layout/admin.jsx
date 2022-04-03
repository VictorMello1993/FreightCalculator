import { useState } from 'react';
import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

import { getUserByToken } from '../../utils/helpers';
import styled from 'styled-components';
import { Link, navigate } from "@reach/router";
import { removeToken } from '../../config/storage';

const LayoutAdmin = ({ children }) => {  
  const [user] = useState(getUserByToken() || {})
  const [openMenu, setOpenMenu] = useState(false)

  const pathDefault = '/admin'
  
  const defineTo = (path) => path === '/' ? pathDefault : pathDefault + path

  const logout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <Admin>
      <Menu>
        <Container>
          <Navbar expand="md" dark>
            <NavbarBrand href="/">Administrador</NavbarBrand>
            <NavbarToggler onClick={() => setOpenMenu(!openMenu)} />
            <Nav navbar>
              <NavItem>
                {/* tag => propriedade de um componente que herda as propriedades de outros componentes
                No caso, NavLink está herdando as propriedades do componente Link do Reach Router */}
                <NavLink tag={Link} to={defineTo("/")}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={defineTo("/fretes")}>Listagem de fretes</NavLink>
              </NavItem>
            </Nav>
            <CollapseCustom navbar isOpen={openMenu}>
              <Nav navbar>                
                <NavItem>
                  <UncontrolledDropdown inNavbar nav>
                    <DropdownToggle caret nav>
                      {user?.name}
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem tag={Link} to={defineTo("/perfil")}>
                        Editar perfil
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={logout}>
                        Sair
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
              </Nav>
            </CollapseCustom>
          </Navbar>
        </Container>
      </Menu >
      <Main>
        <Container>
          <main>{children}</main>
        </Container>
      </Main>
    </Admin>
  )
}

const Admin = styled.div``
const Main = styled.div``

const Menu = styled.div`
  background-color: #335185;
`

const CollapseCustom = styled(Collapse)`  
  display: flex;
  justify-content: flex-end;
`
export default LayoutAdmin