import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useClubs } from '../contexts/ClubContext';
import { useAuth } from '../contexts/AuthContext';

const EventsPage = () => {
  const { events, clubs, loading } = useClubs();
  const { isAuthenticated } = useAuth();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedClub, setSelectedClub] = useState('');

  // Get club name by ID
  const getClubName = (clubId) => {
    const club = clubs.find(c => c.id === clubId);
    return club ? club.name : 'Unknown Club';
  };

  useEffect(() => {
    let filtered = [...events];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }
    
    // Apply club filter
    if (selectedClub) {
      filtered = filtered.filter(event => event.clubId === selectedClub);
    }
    
    // Sort by date (upcoming first)
    filtered.sort((a, b) => {
      // First sort by status (upcoming first)
      if (a.status === 'upcoming' && b.status !== 'upcoming') return -1;
      if (a.status !== 'upcoming' && b.status === 'upcoming') return 1;
      
      // Then sort by date
      return new Date(a.date) - new Date(b.date);
    });
    
    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedStatus, selectedClub]);

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
          <h1 className="mb-1">Events</h1>
          <p className="text-muted mb-0">Discover and participate in exciting events at SVIT</p>
        </div>
        {isAuthenticated && (
          <Button as={Link} to="/events/create" variant="primary">
            <i className="bi bi-plus-circle me-2"></i>Create Event
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
                  placeholder="Search events..."
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
                <option value="">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
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

      {/* Events List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading events...</p>
        </div>
      ) : (
        <>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
              <h4>No events found</h4>
              <p className="text-muted">
                Try adjusting your search or filters, or create a new event.
              </p>
              {isAuthenticated && (
                <Button as={Link} to="/events/create" variant="primary">
                  Create an Event
                </Button>
              )}
            </div>
          ) : (
            <Row>
              {filteredEvents.map(event => (
                <Col md={6} lg={4} key={event.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Img 
                      variant="top" 
                      src={event.image || "/assets/images/event-placeholder.jpg"} 
                      alt={event.name} 
                      height="180"
                      style={{ objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0">{event.name}</h5>
                        <Badge 
                          bg={event.status === 'upcoming' ? 'success' : 'secondary'}
                        >
                          {event.status}
                        </Badge>
                      </div>
                      
                      <div className="text-muted mb-3 small">
                        <div><i className="bi bi-calendar me-2"></i>{event.date}</div>
                        <div><i className="bi bi-clock me-2"></i>{event.time}</div>
                        <div><i className="bi bi-geo-alt me-2"></i>{event.venue}</div>
                      </div>
                      
                      <p className="card-text text-truncate-2 mb-3">{event.description}</p>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="small">
                          <i className="bi bi-people me-1"></i> {event.attendees} attending
                        </div>
                        
                        <Button 
                          as={Link} 
                          to={`/events/${event.id}`} 
                          variant="outline-primary" 
                          size="sm"
                        >
                          View Details
                        </Button>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-top-0 text-muted small">
                      <i className="bi bi-layers me-1"></i> {getClubName(event.clubId)}
                    </Card.Footer>
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

export default EventsPage;