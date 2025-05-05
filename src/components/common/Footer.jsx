import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container className="text-light">
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-4 text-light" >SVIT Clubs & Ideas</h5>
            <p className="text-light">
              Empowering students to innovate, collaborate, and lead through clubs, 
              events, and ideas at SVIT College, Andhra Pradesh.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-warning">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="mb-3 text-light">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">Home</Link>
              </li>
              <li className="mb-2 text-light">
                <Link to="/clubs" className="text-light text-decoration-none">Clubs</Link>
              </li>
              <li className="mb-2 text-light">
                <Link to="/ideas" className="text-light text-decoration-none">Ideas</Link>
              </li>
              <li className="mb-2 text-light">
                <Link to="/events" className="text-light text-decoration-none">Events</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h6 className="mb-3 text-light">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">FAQ</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">Guidelines</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">Club Formation</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">Event Planning</a>
              </li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h6 className="mb-3 text-light">Contact Us</h6>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-start">
                <i className="bi bi-geo-alt-fill me-2 mt-1"></i>
                <span>SVIT College, Andhra Pradesh, South India</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <i className="bi bi-envelope-fill me-2 mt-1"></i>
                <span>clubs@svit.edu.in</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <i className="bi bi-telephone-fill me-2 mt-1"></i>
                <span>+91 123-456-7890</span>
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4 bg-secondary" />
        
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-light">
              &copy; {currentYear} SVIT Clubs & Ideas Management. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#" className="text-light text-decoration-none">Privacy Policy</a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="#" className="text-light text-decoration-none">Terms of Service</a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="#" className="text-light text-decoration-none">Cookie Policy</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;