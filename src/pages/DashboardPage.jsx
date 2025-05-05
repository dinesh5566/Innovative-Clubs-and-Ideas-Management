import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Nav, Tab, Badge } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useClubs } from '../contexts/ClubContext';
import ClubCard from '../components/dashboard/ClubCard';
import EventCard from '../components/dashboard/EventCard';
import IdeaCard from '../components/dashboard/IdeaCard';

const DashboardPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { clubs = [], events = [], ideas = [] } = useClubs();
  const [userClubs, setUserClubs] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentIdeas, setRecentIdeas] = useState([]);

  // Move useEffect to the top before any return statement
  useEffect(() => {
    if (!Array.isArray(clubs) || !Array.isArray(events) || !Array.isArray(ideas)) return;

    setUserClubs(clubs.slice(0, 2));

    const upcoming = events
      .filter(event => event.status === 'upcoming' && event.date)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
    setUpcomingEvents(upcoming);

    const recent = ideas
      .filter(idea => idea.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
    setRecentIdeas(recent);
  }, [clubs, events, ideas]);

  // Now handle the conditional return AFTER useEffect
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: '/dashboard' } }} />;
  }

  return (
    <Container className="py-5">
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 bg-primary text-white">
            <Card.Body className="py-4">
              <Row className="align-items-center">
                <Col md={8}>
                  <h2 className="mb-1">Welcome back, {currentUser.name}!</h2>
                  <p className="mb-0">
                    Stay up to date with your clubs, upcoming events, and innovative ideas.
                  </p>
                </Col>
                <Col md={4} className="text-md-end mt-3 mt-md-0">
                  <Button 
                    as={Link} 
                    to="/clubs/create" 
                    variant="light" 
                    className="me-2"
                  >
                    Create Club
                  </Button>
                  <Button 
                    as={Link} 
                    to="/ideas/create" 
                    variant="outline-light"
                  >
                    Share Idea
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stats Section */}
      <Row className="mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="border-0 text-center h-100">
            <Card.Body>
              <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle p-3 mb-3">
                <i className="bi bi-people-fill fs-2 text-primary"></i>
              </div>
              <h3 className="fs-2 fw-bold mb-1">{userClubs.length}</h3>
              <p className="text-muted mb-0">Clubs Joined</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="border-0 text-center h-100">
            <Card.Body>
              <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle p-3 mb-3">
                <i className="bi bi-calendar-event-fill fs-2 text-success"></i>
              </div>
              <h3 className="fs-2 fw-bold mb-1">{upcomingEvents.length}</h3>
              <p className="text-muted mb-0">Upcoming Events</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="border-0 text-center h-100">
            <Card.Body>
              <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle p-3 mb-3">
                <i className="bi bi-lightbulb-fill fs-2 text-warning"></i>
              </div>
              <h3 className="fs-2 fw-bold mb-1">{recentIdeas.length}</h3>
              <p className="text-muted mb-0">New Ideas</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Content Section */}
      <Tab.Container defaultActiveKey="clubs">
        <Row>
          <Col>
            <Card className="border-0">
              <Card.Header className="bg-white border-0 pt-4 pb-1">
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="clubs">
                      My Clubs <Badge bg="primary" pill>{userClubs.length}</Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="events">
                      Upcoming Events <Badge bg="success" pill>{upcomingEvents.length}</Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="ideas">
                      Recent Ideas <Badge bg="warning" text="dark" pill>{recentIdeas.length}</Badge>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              
              <Card.Body className="p-4">
                <Tab.Content>
                  <Tab.Pane eventKey="clubs">
                    <Row>
                      {userClubs.map(club => (
                        <Col md={6} key={club.id} className="mb-4">
                          <ClubCard club={club} />
                        </Col>
                      ))}
                      
                      <Col md={6}>
                        <Card className="h-100 border-dashed">
                          <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-4">
                            <div className="mb-3">
                              <i className="bi bi-plus-circle fs-1 text-muted"></i>
                            </div>
                            <h5>Discover More Clubs</h5>
                            <p className="text-muted mb-3">
                              Find and join clubs that match your interests
                            </p>
                            <Button 
                              as={Link} 
                              to="/clubs" 
                              variant="outline-primary"
                            >
                              Browse Clubs
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="events">
                    <Row>
                      {upcomingEvents.map(event => (
                        <Col md={4} key={event.id} className="mb-4">
                          <EventCard event={event} />
                        </Col>
                      ))}
                      
                      <Col md={4}>
                        <Card className="h-100 border-dashed">
                          <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-4">
                            <div className="mb-3">
                              <i className="bi bi-plus-circle fs-1 text-muted"></i>
                            </div>
                            <h5>Create an Event</h5>
                            <p className="text-muted mb-3">
                              Organize an event for your club or community
                            </p>
                            <Button 
                              as={Link} 
                              to="/events/create" 
                              variant="outline-primary"
                            >
                              Create Event
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="ideas">
                    <Row>
                      {recentIdeas.map(idea => (
                        <Col md={4} key={idea.id} className="mb-4">
                          <IdeaCard idea={idea} />
                        </Col>
                      ))}
                      
                      <Col md={4}>
                        <Card className="h-100 border-dashed">
                          <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-4">
                            <div className="mb-3">
                              <i className="bi bi-plus-circle fs-1 text-muted"></i>
                            </div>
                            <h5>Share Your Idea</h5>
                            <p className="text-muted mb-3">
                              Propose your innovative idea to the community
                            </p>
                            <Button 
                              as={Link} 
                              to="/ideas/create" 
                              variant="outline-primary"
                            >
                              Submit Idea
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default DashboardPage;