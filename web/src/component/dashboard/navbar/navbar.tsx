import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MainNavbar() {
  const pages = [
    {
      path: '/',
      label: 'Home'
    },
    {
      path: '/about',
      label: 'About'
    }
  ];

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <ul className="navbar-nav mr-auto">
          {pages.map(page => (
            <li key={page.path} className="nav-item">
              <Link to={page.path} className="nav-link">{page.label}</Link>
            </li>
          ))}
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavbar