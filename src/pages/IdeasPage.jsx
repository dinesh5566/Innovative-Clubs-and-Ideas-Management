import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useClubs } from '../contexts/ClubContext';
import { useAuth } from '../contexts/AuthContext';

const IdeasPage = () => {
  const { ideas, clubs, loading } = useClubs();
  const { isAuthenticated } = useAuth();
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedClub, setSelectedClub] = useState('');

  // Get club name by ID
  const getClubName = (clubId) => {
    const club = clubs.find(c => c.id === clubId);
    return club ? club.name : 'Unknown Club';
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'proposed':
        return 'warning';
      case 'in-progress':
        return 'info';
      case 'approved':
        return 'success';
      default:
        return 'secondary';
    }
  };

  useEffect(() => {
    let filtered = [...ideas];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(idea => 
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.creator.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(idea => idea.status === selectedStatus);
    }
    
    // Apply club filter
    if (selectedClub) {
      filtered = filtered.filter(idea => idea.clubId === selectedClub);
    }
    
    setFilteredIdeas(filtered);
  }, [ideas, searchTerm, selectedStatus, selectedClub]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleClubChange = (e) => {
    setSelectedClub(e.target.value);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">Innovative Ideas</h1>
          <p className="text-muted mb-0">Discover and vote on innovative ideas proposed by students</p>
        </div>
        {isAuthenticated && (
          <Button as={Link} to="/ideas/create" variant="primary">
            <i className="bi bi-plus-circle me-2"></i>Share Your Idea
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
                  placeholder="Search ideas..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Form.Select
                value={selectedStatus}
                onChange={handleStatusChange}
                aria-label="Filter by status"
              >
                <option value="">All Statuses</option>
                <option value="proposed">Proposed</option>
                <option value="in-progress">In Progress</option>
                <option value="approved">Approved</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                value={selectedClub}
                onChange={handleClubChange}
                aria-label="Filter by club"
              >
                <option value="">All Clubs</option>
                {clubs.map(club => (
                  <option key={club.id} value={club.id}>
                    {club.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Ideas List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading ideas...</p>
        </div>
      ) : (
        <>
          {filteredIdeas.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-muted mb-3"></i>
              <h4>No ideas found</h4>
              <p className="text-muted">
                Try adjusting your search or filters, or share a new idea.
              </p>
              {isAuthenticated && (
                <Button as={Link} to="/ideas/create" variant="primary">
                  Share Your Idea
                </Button>
              )}
            </div>
          ) : (
            <Row>
              {filteredIdeas.map(idea => (
                <Col md={6} lg={4} key={idea.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0">{idea.title}</h5>
                        <Badge 
                          bg={getStatusColor(idea.status)}
                          text={idea.status === 'proposed' ? 'dark' : 'white'}
                        >
                          {idea.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-person-circle me-2 text-muted"></i>
                        <span className="small">{idea.creator}</span>
                        
                        {idea.clubId && (
                          <>
                            <span className="mx-2 text-muted">•</span>
                            <span className="small">{getClubName(idea.clubId)}</span>
                          </>
                        )}
                        
                        <span className="ms-auto text-muted small">
                          {idea.createdAt}
                        </span>
                      </div>
                      
                      <p className="card-text text-truncate-2 mb-3">{idea.description}</p>
                      
                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {idea.tags.map((tag, index) => (
                          <span key={index} className="badge bg-light text-dark">#{tag}</span>
                        ))}
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          disabled={!isAuthenticated}
                        >
                          <i className="bi bi-hand-thumbs-up me-1"></i> {idea.votes}
                        </Button>
                        
                        <Button
                          as={Link}
                          to={`/ideas/${idea.id}`}
                          variant="outline-primary"
                          size="sm"
                        >
                          View Details
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

export default IdeasPage;