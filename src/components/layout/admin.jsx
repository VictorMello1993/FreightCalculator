import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavbarText, NavItem, NavLink } from 'reactstrap';
import { getUserByToken } from '../../utils/helpers';

const LayoutAdmin = ({children}) => {
  const {email} = getUserByToken()
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
            {email}            
          </NavbarText>
        </Collapse>
      </Navbar>
      <main>{children}</main>
    </div>
  )
}

export default LayoutAdmin