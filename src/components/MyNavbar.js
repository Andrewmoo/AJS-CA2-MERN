import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


export default class MyNavbar extends Component {

  logout = () => {
    localStorage.removeItem('jwtToken');
    this.props.onLogout();
    window.location = '/';
  }

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <Navbar className="navbar navbar-dark bg-dark mb-5">
        <Navbar.Brand to="/">Tracks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {loggedIn ?
              <>
                <Nav.Link as={Link} to="/tracks/create">Create</Nav.Link>
              </>
              :
              <>
              </>
            }


          </Nav>
          <Nav>
            {loggedIn ?
              <>
                {/* <Nav.Link>{this.props.userEmail}</Nav.Link> */}
                <NavDropdown title={this.props.userEmail} id="basic-nav-dropdown">



                  <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>



                </NavDropdown>

              </>
              :
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
