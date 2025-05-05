import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useClubs } from '../contexts/ClubContext';
import { useAuth } from '../contexts/AuthContext';

const ClubsPage = () => {
  const { clubs, loading } = useClubs();
  const { isAuthenticated } = useAuth();
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories
  const categories = ['All', ...new Set(clubs.map(club => club.category))];

  useEffect(() => {
    let filtered = [...clubs];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(club => 
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(club => club.category === selectedCategory);
    }
    
    setFilteredClubs(filtered);
  }, [clubs, searchTerm, selectedCategory]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">Student Clubs</h1>
          <p className="text-muted mb-0">Discover and join clubs that match your interests</p>
        </div>
        {isAuthenticated && (
          <Button as={Link} to="/clubs/create" variant="primary">
            <i className="bi bi-plus-circle me-2"></i>Create Club
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search clubs..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Form.Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                aria-label="Filter by category"
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  category !== 'All' && (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  )
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Clubs List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading clubs...</p>
        </div>
      ) : (
        <>
          {filteredClubs.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-muted mb-3"></i>
              <h4>No clubs found</h4>
              <p className="text-muted">
                Try adjusting your search or filters, or create a new club.
              </p>
              {isAuthenticated && (
                <Button as={Link} to="/clubs/create" variant="primary">
                  Create a Club
                </Button>
              )}
            </div>
          ) : (
            <Row>
              {filteredClubs.map(club => (
                <Col md={6} lg={4} key={club.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-3">
                          <img 
                            src={club.logo || "/assets/images/club-placeholder.png"} 
                            alt={club.name} 
                            className="rounded-circle" 
                            width="60" 
                            height="60"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <h5 className="card-title mb-1">{club.name}</h5>
                          <span className="badge bg-light text-dark">{club.category}</span>
                        </div>
                      </div>
                      
                      <p className="card-text text-truncate-2 mb-3">{club.description}</p>
                      
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <small className="text-muted d-block">Members</small>
                          <strong>{club.members}</strong>
                        </div>
                        <div className="me-3">
                          <small className="text-muted d-block">Events</small>
                          <strong>{club.events.length}</strong>
                        </div>
                        <div>
                          <small className="text-muted d-block">Ideas</small>
                          <strong>{club.ideas.length}</strong>
                        </div>
                      </div>
                      
                      <div className="text-end">
                        <Button 
                          as={Link} 
                          to={`/clubs/${club.id}`} 
                          variant="outline-primary" 
                          size="sm"
                        >
                          View Club
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default ClubsPage;