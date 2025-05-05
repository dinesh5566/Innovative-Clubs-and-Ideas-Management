import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const AppNavbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { success } = useNotification();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    success('Successfully logged out');
    navigate('/');
  };

  return (
    <Navbar bg="white" expand="lg" className="py-3 shadow-sm" expanded={expanded} onToggle={setExpanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src="https://svitatp.ac.in/public/assets/admin/images/sitesetting/664263736b243_SVIT%20LOGO.png" 
            alt="SVIT Clubs" 
            height="40" 
            className="me-2"
          />
          <span className="fw-bold text-primary">SVIT Clubs & Ideas</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar" />
        
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/clubs" onClick={() => setExpanded(false)}>Clubs</Nav.Link>
            <Nav.Link as={Link} to="/ideas" onClick={() => setExpanded(false)}>Ideas</Nav.Link>
            <Nav.Link as={Link} to="/events" onClick={() => setExpanded(false)}>Events</Nav.Link>
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-user" className="d-flex align-items-center">
                  <img 
                    src={currentUser.profileImage || "https://tse2.mm.bing.net/th?id=OIP.GqGVPkLpUlSo5SmeDogUdwHaHa&pid=Api&P=0&h=180"} 
                    alt={currentUser.name} 
                    className="rounded-circle me-2" 
                    width="30" 
                    height="30"
                  />
                  <span>{currentUser.name}</span>
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/dashboard" onClick={() => setExpanded(false)}>
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/profile" onClick={() => setExpanded(false)}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => {
                    handleLogout();
                    setExpanded(false);
                  }}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex gap-2">
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-primary" 
                  className="me-2"
                  onClick={() => setExpanded(false)}
                >
                  Login
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary"
                  onClick={() => setExpanded(false)}
                >
                  Register
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;