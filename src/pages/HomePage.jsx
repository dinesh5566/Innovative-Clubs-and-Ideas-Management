import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useClubs } from '../contexts/ClubContext';


const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const { clubs, events, ideas } = useClubs();

  // Get 3 featured clubs
  const featuredClubs = clubs.slice(0, 3);
  
  // Get 3 upcoming events
  const upcomingEvents = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
  
  // Get 3 top ideas
  const topIdeas = ideas
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5 mb-5 bg-primary text-white p-3">
        <Container className="custom-container ">
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3 text-light">Innovate, Collaborate, Lead</h1>
              <p className="lead mb-4">
                Discover student clubs, share innovative ideas, and participate in exciting events at SVIT College.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                {isAuthenticated ? (
                  <Button as={Link} to="/dashboard" variant="primary" size="lg">
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button as={Link} to="/register" variant="primary" size="lg">
                      Join the Community
                    </Button>
                    <Button as={Link} to="/login" variant="outline-light" size="lg">
                      Sign In
                    </Button>
                  </>
                )}
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src="https://img.freepik.com/free-vector/benefits-playing-video-games_23-2148521157.jpg?ga=GA1.1.1629250849.1720450330&semt=ais_hybrid" 
                alt="SVIT Clubs and Ideas" 
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">How It Works</h2>
            <p className="text-muted">Empower your college journey with our integrated platform for clubs and innovation</p>
          </div>
          
          <Row>
            <Col md={4} className="mb-4 ">
              <div className="feature-card card h-100 bg-primary text-white ">
                <div className="card-body ">
                  <div className="text-primary mb-3">
                    <i className="bi bi-people-fill fs-1"></i>
                  </div>
                  <h4 className="text-white">Join Clubs</h4>
                  <p className="text-white">
                    Discover and join student clubs aligned with your interests and passions.
                  </p>
                </div>
              </div>
            </Col>
            
            <Col md={4} className="mb-4">
              <div className="feature-card card h-100 bg-primary text-white ">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <i className="bi bi-lightbulb-fill fs-1"></i>
                  </div>
                  <h4 className="text-white">Share Ideas</h4>
                  <p className="text-white">
                    Propose innovative ideas and get feedback from peers and mentors.
                  </p>
                </div>
              </div>
            </Col>
            
            <Col md={4} className="mb-4">
              <div className="feature-card card h-100 bg-primary text-white ">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <i className="bi bi-calendar-event-fill fs-1"></i>
                  </div>
                  <h4 className="text-white">Attend Events</h4>
                  <p className="text-white">
                    Participate in exciting events organized by various clubs and departments.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Clubs Section */}
      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Featured Clubs</h2>
            <Button as={Link} to="/clubs" variant="outline-primary">View All</Button>
          </div>
          
          <Row>
            {featuredClubs.map(club => (
              <Col md={4} key={club.id} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <img 
                          src={club.logo} 
                          alt={club.name} 
                          className="rounded-circle" 
                          width="50" 
                          height="50"
                        />
                      </div>
                      <div>
                        <h5 className="card-title mb-0">{club.name}</h5>
                        <span className="badge bg-light text-dark">{club.category}</span>
                      </div>
                    </div>
                    <p className="card-text text-truncate-2 mb-3">{club.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted small">{club.members} members</span>
                      <Button as={Link} to={`/clubs/${club.id}`} variant="outline-primary" size="sm">
                        View Club
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Upcoming Events</h2>
            <Button as={Link} to="/events" variant="outline-primary">View All</Button>
          </div>
          
          <Row>
            {upcomingEvents.map(event => (
              <Col md={4} key={event.id} className="mb-4">
                <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src={event.image || "/hack.png"} 
                    alt={event.name} 
                    height="180"
                    style={{ objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <h5 className="card-title mb-1">{event.name}</h5>
                    <p className="text-muted mb-2 small">
                      <i className="bi bi-calendar me-1"></i> {event.date} | 
                      <i className="bi bi-clock ms-2 me-1"></i> {event.time} |
                      <i className="bi bi-geo-alt ms-2 me-1"></i> {event.venue}
                    </p>
                    <p className="card-text text-truncate-2 mb-3">{event.description}</p>
                    <Button as={Link} to={`/events/${event.id}`} variant="outline-primary" size="sm">
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Innovative Ideas Section */}
      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Top Innovative Ideas</h2>
            <Button as={Link} to="/ideas" variant="outline-primary">View All</Button>
          </div>
          
          <Row>
            {topIdeas.map(idea => (
              <Col md={4} key={idea.id} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title mb-0">{idea.title}</h5>
                      <span className="badge bg-primary">{idea.votes} votes</span>
                    </div>
                    <p className="text-muted mb-2 small">
                      <i className="bi bi-person me-1"></i> {idea.creator} |
                      <i className="bi bi-tag ms-2 me-1"></i> {idea.status}
                    </p>
                    <p className="card-text mb-3">{idea.description}</p>
                    <div className="d-flex flex-wrap gap-1 mb-3">
                      {idea.tags.map((tag, index) => (
                        <span key={index} className="badge bg-light text-dark">#{tag}</span>
                      ))}
                    </div>
                    <Button as={Link} to={`/ideas/${idea.id}`} variant="outline-primary" size="sm">
                      View Idea
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white text-center">
        <Container>
          <h2 className="fw-bold mb-3">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Join the SVIT Clubs & Ideas community to connect with like-minded students and bring your ideas to life.
          </p>
          <div className="d-flex justify-content-center gap-3">
            {isAuthenticated ? (
              <Button as={Link} to="/dashboard" variant="light" size="lg">
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button as={Link} to="/register" variant="light" size="lg">
                  Create an Account
                </Button>
                <Button as={Link} to="/login" variant="outline-light" size="lg">
                  Sign In
                </Button>
              </>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;