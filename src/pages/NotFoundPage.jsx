import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="mb-4">
            <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: 'var(--primary)' }}>404</h1>
          </div>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead text-muted mb-5">
            Oops! The page you're looking for doesn't exist or might have been moved.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button as={Link} to="/" variant="primary" size="lg">
              Back to Home
            </Button>
            <Button as={Link} to="/clubs" variant="outline-primary" size="lg">
              Explore Clubs
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;