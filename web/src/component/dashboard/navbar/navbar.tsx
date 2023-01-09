import { Container, Nav, Navbar } from 'react-bootstrap';
import { Github, Linkedin, Facebook } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function MainNavbar() {
  const pages = [
    {
      path: '/watch',
      label: 'Watch'
    },
    {
      path: '/calculator',
      label: 'Calculator'
    },
    {
      path: '/todo',
      label: 'Todo'
    },
    {
      path: '/game',
      label: 'Games'
    },
    {
      path: '/about',
      label: 'About'
    }
  ];

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/"><Navbar.Brand>DanySAM</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <ul className="navbar-nav mr-auto">
                {pages.map(page => (
                  <li key={page.path} className="nav-item">
                    <Link to={page.path} className="nav-link">{page.label}</Link>
                  </li>
                ))}
              </ul>
            </Nav>
            <Nav>
              <Nav.Link>
                <Github />
              </Nav.Link>
              <Nav.Link>
                <Linkedin />
              </Nav.Link>
              <Nav.Link>
                <Facebook />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar