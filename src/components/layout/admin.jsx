import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavbarText, NavItem, NavLink } from 'reactstrap';
import { getUserByToken } from '../../utils/helpers';

getUserByToken()

const LayoutAdmin = ({children}) => {
  return (
    <div>
      <Navbar
        color="light"
        expand="md"
        light
      >
        <NavbarBrand href="/">
          Administrador
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() { }} />
        <Collapse navbar>
          <Nav
            className="me-auto"
            navbar
          >
            {/* <NavItem>
              <NavLink href="/components/">
                Components
              </NavLink>
            </NavItem> */}
          </Nav>
          <NavbarText>
            {JSON.stringify(getUserByToken())}            
          </NavbarText>
        </Collapse>
      </Navbar>
      <main>{children}</main>
    </div>
  )
}

export default LayoutAdmin