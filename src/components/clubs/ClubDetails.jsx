import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Nav, Tab, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useClubs } from '../../contexts/ClubContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import EventCard from '../dashboard/EventCard';
import IdeaCard from '../dashboard/IdeaCard';

const ClubDetails = () => {
  const { id } = useParams();
  const { getClubById, getEventsByClubId, getIdeasByClubId, deleteClub } = useClubs();
  const { isAuthenticated, currentUser } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();
  
  const [club, setClub] = useState(null);
  const [clubEvents, setClubEvents] = useState([]);
  const [clubIdeas, setClubIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchClubData = () => {
      const clubData = getClubById(id);
      if (clubData) {
        setClub(clubData);
        setClubEvents(getEventsByClubId(id));
        setClubIdeas(getIdeasByClubId(id));
      }
      setLoading(false);
    };

    fetchClubData();
  }, [id, getClubById, getEventsByClubId, getIdeasByClubId]);

  const handleDeleteClub = async () => {
    if (window.confirm('Are you sure you want to delete this club? This action cannot be undone.')) {
      try {
        await deleteClub(id);
        success('Club deleted successfully');
        navigate('/clubs');
      } catch (err) {
        error('Failed to delete club',err);
      }
    }
  };

  // Check if club exists
  if (!loading && !club) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          Club not found. The club you're looking for may have been removed or doesn't exist.
        </Alert>
        <Button as={Link} to="/clubs" variant="primary" className="mt-3">
          Back to Clubs
        </Button>
      </Container>
    );
  }

  // Check if user is the president of the club (for demo purposes)
  const isPresident = isAuthenticated && currentUser.name === club?.president;

  return (
    <Container className="py-5">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading club details...</p>
        </div>
      ) : (
        <>
          {/* Club Header */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={8} className="mb-4 mb-md-0">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-4">
                      <img 
                        src={club.logo || "/assets/images/club-placeholder.png"} 
                        alt={club.name} 
                        className="rounded-circle" 
                        width="100" 
                        height="100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <h1 className="mb-1">{club.name}</h1>
                      <div className="d-flex align-items-center flex-wrap">
                        <Badge bg="light" text="dark" className="me-2 mb-2">{club.category}</Badge>
                        <span className="me-3 mb-2 text-muted">
                          <i className="bi bi-people me-1"></i> {club.members} members
                        </span>
                        <span className="text-muted mb-2">
                          <i className="bi bi-calendar me-1"></i> Est. {club.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                
                <Col md={4} className="text-md-end">
                  {isAuthenticated && (
                    <div className="d-flex justify-content-md-end gap-2">
                      <Button 
                        as={Link} 
                        to={`/events/create?clubId=${club.id}`} 
                        variant="success"
                      >
                        <i className="bi bi-calendar-plus me-1"></i> Create Event
                      </Button>
                      
                      {isPresident && (
                        <Button variant="danger" onClick={handleDeleteClub}>
                          <i className="bi bi-trash me-1"></i> Delete Club
                        </Button>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          {/* Club Content */}
          <Row>
            <Col>
              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white pt-3 pb-0 border-0">
                    <Nav variant="tabs">
                      <Nav.Item>
                        <Nav.Link eventKey="about">About</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="events">
                          Events <Badge bg="primary" pill>{clubEvents.length}</Badge>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="ideas">
                          Ideas <Badge bg="primary" pill>{clubIdeas.length}</Badge>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Card.Header>
                  
                  <Card.Body className="p-4">
                    <Tab.Content>
                      {/* About Tab */}
                      <Tab.Pane eventKey="about">
                        <Row>
                          <Col lg={8}>
                            <h4 className="mb-3">Description</h4>
                            <p>{club.description}</p>
                            
                            <hr className="my-4" />
                            
                            <h4 className="mb-3">Club Management</h4>
                            <Row>
                              <Col md={6} className="mb-3">
                                <Card className="bg-light border-0">
                                  <Card.Body>
                                    <h6 className="mb-2">President</h6>
                                    <div className="d-flex align-items-center">
                                      <div className="me-2">
                                        <i className="bi bi-person-circle fs-4"></i>
                                      </div>
                                      <div>
                                        <strong>{club.president}</strong>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                              
                              <Col md={6} className="mb-3">
                                <Card className="bg-light border-0">
                                  <Card.Body>
                                    <h6 className="mb-2">Faculty Advisor</h6>
                                    <div className="d-flex align-items-center">
                                      <div className="me-2">
                                        <i className="bi bi-person-circle fs-4"></i>
                                      </div>
                                      <div>
                                        <strong>{club.faculty}</strong>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            </Row>
                          </Col>
                          
                          <Col lg={4}>
                            <Card className="bg-light border-0 mb-4">
                              <Card.Body>
                                <h5 className="mb-3">Club Stats</h5>
                                <div className="d-flex justify-content-between mb-2">
                                  <span>Members</span>
                                  <strong>{club.members}</strong>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                  <span>Events</span>
                                  <strong>{clubEvents.length}</strong>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                  <span>Ideas</span>
                                  <strong>{clubIdeas.length}</strong>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span>Established</span>
                                  <strong>{club.createdAt}</strong>
                                </div>
                              </Card.Body>
                            </Card>
                            
                            {isAuthenticated && (
                              <Button variant="primary" className="w-100">
                                <i className="bi bi-person-plus me-2"></i> Join Club
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </Tab.Pane>
                      
                      {/* Events Tab */}
                      <Tab.Pane eventKey="events">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h4 className="mb-0">Club Events</h4>
                          
                          {isAuthenticated && (
                            <Button 
                              as={Link} 
                              to={`/events/create?clubId=${club.id}`} 
                              variant="primary"
                              size="sm"
                            >
                              <i className="bi bi-plus-circle me-1"></i> Create Event
                            </Button>
                          )}
                        </div>
                        
                        {clubEvents.length === 0 ? (
                          <Alert variant="info">
                            This club hasn't organized any events yet.
                          </Alert>
                        ) : (
                          <Row>
                            {clubEvents.map(event => (
                              <Col md={6} lg={4} key={event.id} className="mb-4">
                                <EventCard event={event} />
                              </Col>
                            ))}
                          </Row>
                        )}
                      </Tab.Pane>
                      
                      {/* Ideas Tab */}
                      <Tab.Pane eventKey="ideas">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h4 className="mb-0">Club Ideas</h4>
                          
                          {isAuthenticated && (
                            <Button 
                              as={Link} 
                              to={`/ideas/create?clubId=${club.id}`} 
                              variant="primary"
                              size="sm"
                            >
                              <i className="bi bi-plus-circle me-1"></i> Share Idea
                            </Button>
                          )}
                        </div>
                        
                        {clubIdeas.length === 0 ? (
                          <Alert variant="info">
                            No ideas have been shared in this club yet.
                          </Alert>
                        ) : (
                          <Row>
                            {clubIdeas.map(idea => (
                              <Col md={6} lg={4} key={idea.id} className="mb-4">
                                <IdeaCard idea={idea} />
                              </Col>
                            ))}
                          </Row>
                        )}
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ClubDetails;