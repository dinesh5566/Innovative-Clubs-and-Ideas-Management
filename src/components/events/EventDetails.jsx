import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useClubs } from '../../contexts/ClubContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const EventDetails = () => {
  const { id } = useParams();
  const { getEventById, getClubById, deleteEvent, updateEvent } = useClubs();
  const { isAuthenticated, currentUser } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAttending, setIsAttending] = useState(false);

  useEffect(() => {
    const fetchEventData = () => {
      const eventData = getEventById(id);
      if (eventData) {
        setEvent(eventData);
        if (eventData.clubId) {
          setClub(getClubById(eventData.clubId));
        }
      }
      setLoading(false);
    };

    fetchEventData();
  }, [id, getEventById, getClubById]);

  const handleAttend = async () => {
    try {
      // In a real app, you would track the attendees properly
      await updateEvent(id, { 
        attendees: event.attendees + 1 
      });
      
      setEvent(prevEvent => ({
        ...prevEvent,
        attendees: prevEvent.attendees + 1
      }));
      
      setIsAttending(true);
      success('You are now attending this event!');
    } catch (err) {
      error('Failed to register for this event',err);
    }
  };

  const handleCancelAttend = async () => {
    try {
      // In a real app, you would track the attendees properly
      await updateEvent(id, { 
        attendees: Math.max(0, event.attendees - 1)
      });
      
      setEvent(prevEvent => ({
        ...prevEvent,
        attendees: Math.max(0, prevEvent.attendees - 1)
      }));
      
      setIsAttending(false);
      success('You have canceled your attendance.');
    } catch (err) {
      console.error("Failed to register for this event", err);
      
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await deleteEvent(id);
        success('Event deleted successfully');
        navigate('/events');
      } catch (err) {
        error('Failed to delete event',err);
      }
    }
  };

  // Check if event exists
  if (!loading && !event) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          Event not found. The event you're looking for may have been removed or doesn't exist.
        </Alert>
        <Button as={Link} to="/events" variant="primary" className="mt-3">
          Back to Events
        </Button>
      </Container>
    );
  }

  // Check if user can manage the event (for demo purposes)
  // In a real app, you would check if the user is an organizer or has permissions
  const canManageEvent = isAuthenticated && club && currentUser.name === club.president;

  return (
    <Container className="py-5">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading event details...</p>
        </div>
      ) : (
        <>
          {/* Event Header */}
          <Card className="border-0 shadow-sm mb-4">
            <Row className="g-0">
              <Col md={4}>
                <img 
                  src={event.image || "/assets/images/event-placeholder.jpg"} 
                  alt={event.name}
                  className="img-fluid rounded-start h-100"
                  style={{ objectFit: 'cover' }}
                />
              </Col>
              <Col md={8}>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h1 className="mb-0">{event.name}</h1>
                    <Badge 
                      bg={event.status === 'upcoming' ? 'success' : 'secondary'}
                      className="fs-6"
                    >
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-calendar-event me-2 text-primary fs-5"></i>
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-clock me-2 text-primary fs-5"></i>
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-geo-alt me-2 text-primary fs-5"></i>
                      <span>{event.venue}</span>
                    </div>
                    
                    {club && (
                      <div className="d-flex align-items-center">
                        <i className="bi bi-layers me-2 text-primary fs-5"></i>
                        <Link to={`/clubs/${club.id}`} className="text-decoration-none">
                          {club.name}
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <i className="bi bi-people me-1"></i> {event.attendees} people attending
                    </div>
                    
                    <div className="d-flex gap-2">
                      {isAuthenticated && event.status === 'upcoming' && (
                        <>
                          {!isAttending ? (
                            <Button onClick={handleAttend} variant="success">
                              <i className="bi bi-check-circle me-1"></i> Attend Event
                            </Button>
                          ) : (
                            <Button onClick={handleCancelAttend} variant="outline-danger">
                              <i className="bi bi-x-circle me-1"></i> Cancel Attendance
                            </Button>
                          )}
                        </>
                      )}
                      
                      {canManageEvent && (
                        <Button variant="danger" onClick={handleDeleteEvent}>
                          <i className="bi bi-trash me-1"></i> Delete Event
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          
          {/* Event Content */}
          <Row>
            <Col lg={8}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h4 className="mb-3">About This Event</h4>
                  <p>{event.description}</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h4 className="mb-3">Event Details</h4>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span>Date</span>
                    <strong>{event.date}</strong>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span>Time</span>
                    <strong>{event.time}</strong>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span>Venue</span>
                    <strong>{event.venue}</strong>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span>Status</span>
                    <Badge 
                      bg={event.status === 'upcoming' ? 'success' : 'secondary'}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="d-flex justify-content-between">
                    <span>Attendees</span>
                    <strong>{event.attendees}</strong>
                  </div>
                </Card.Body>
              </Card>
              
              {club && (
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body className="p-4">
                    <h4 className="mb-3">Organized By</h4>
                    
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <img 
                          src={club.logo || "/assets/images/club-placeholder.png"} 
                          alt={club.name} 
                          className="rounded-circle" 
                          width="60" 
                          height="60"
                        />
                      </div>
                      <div>
                        <h5 className="mb-1">{club.name}</h5>
                        <Badge bg="light" text="dark">{club.category}</Badge>
                      </div>
                    </div>
                    
                    <Button 
                      as={Link} 
                      to={`/clubs/${club.id}`} 
                      variant="outline-primary" 
                      className="w-100"
                    >
                      View Club
                    </Button>
                  </Card.Body>
                </Card>
              )}
              
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h4 className="mb-3">Share Event</h4>
                  <p className="text-muted">Invite your friends to join this event:</p>
                  
                  <div className="d-flex gap-2 mb-3">
                    <Button variant="outline-primary" className="w-100">
                      <i className="bi bi-facebook"></i>
                    </Button>
                    <Button variant="outline-info" className="w-100">
                      <i className="bi bi-twitter"></i>
                    </Button>
                    <Button variant="outline-success" className="w-100">
                      <i className="bi bi-whatsapp"></i>
                    </Button>
                    <Button variant="outline-secondary" className="w-100">
                      <i className="bi bi-envelope"></i>
                    </Button>
                  </div>
                  
                  <Button variant="outline-secondary" className="w-100">
                    <i className="bi bi-link-45deg me-1"></i> Copy Link
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default EventDetails;