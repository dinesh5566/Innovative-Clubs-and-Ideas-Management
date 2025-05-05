import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useClubs } from '../../contexts/ClubContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const IdeaDetails = () => {
  const { id } = useParams();
  const { getIdeaById, getClubById, voteIdea, deleteIdea, updateIdea } = useClubs();
  const { isAuthenticated, currentUser } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();
  
  const [idea, setIdea] = useState(null);
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeaData = () => {
      const ideaData = getIdeaById(id);
      if (ideaData) {
        setIdea(ideaData);
        if (ideaData.clubId) {
          setClub(getClubById(ideaData.clubId));
        }
      }
      setLoading(false);
    };

    fetchIdeaData();
  }, [id, getIdeaById, getClubById]);

  const handleVote = async () => {
    try {
      await voteIdea(id);
      setIdea(prevIdea => ({
        ...prevIdea,
        votes: prevIdea.votes + 1
      }));
      success('Vote recorded successfully!');
    } catch (err) {
      error('Failed to vote for this idea');
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await updateIdea(id, { status: newStatus });
      setIdea(prevIdea => ({
        ...prevIdea,
        status: newStatus
      }));
      success(`Idea status updated to ${newStatus.replace('-', ' ')}`);
    } catch (err) {
      error('Failed to update idea status');
    }
  };

  const handleDeleteIdea = async () => {
    if (window.confirm('Are you sure you want to delete this idea? This action cannot be undone.')) {
      try {
        await deleteIdea(id);
        success('Idea deleted successfully');
        navigate('/ideas');
      } catch (err) {
        error('Failed to delete idea');
      }
    }
  };

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

  // Check if idea exists
  if (!loading && !idea) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          Idea not found. The idea you're looking for may have been removed or doesn't exist.
        </Alert>
        <Button as={Link} to="/ideas" variant="primary" className="mt-3">
          Back to Ideas
        </Button>
      </Container>
    );
  }

  // Check if user is the creator of the idea (for demo purposes)
  const isCreator = isAuthenticated && currentUser.name === idea?.creator;

  return (
    <Container className="py-5">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading idea details...</p>
        </div>
      ) : (
        <>
          {/* Idea Header */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <Row>
                <Col md={8} className="mb-4 mb-md-0">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h1 className="mb-0">{idea.title}</h1>
                    <Badge 
                      bg={getStatusColor(idea.status)}
                      text={idea.status === 'proposed' ? 'dark' : 'white'}
                      className="fs-6"
                    >
                      {idea.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-person-circle me-2"></i>
                    <span>{idea.creator}</span>
                    
                    {club && (
                      <>
                        <span className="mx-2">•</span>
                        <Link to={`/clubs/${club.id}`} className="text-decoration-none">
                          {club.name}
                        </Link>
                      </>
                    )}
                    
                    <span className="ms-3 text-muted">
                      <i className="bi bi-calendar me-1"></i> {idea.createdAt}
                    </span>
                  </div>
                  
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {idea.tags.map((tag, index) => (
                      <span key={index} className="badge bg-light text-dark">#{tag}</span>
                    ))}
                  </div>
                </Col>
                
                <Col md={4} className="text-md-end">
                  <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                    {isAuthenticated && (
                      <Button 
                        onClick={handleVote}
                        variant="outline-primary"
                      >
                        <i className="bi bi-hand-thumbs-up me-1"></i> Vote ({idea.votes})
                      </Button>
                    )}
                    
                    {isCreator && (
                      <Button variant="danger" onClick={handleDeleteIdea}>
                        <i className="bi bi-trash me-1"></i> Delete
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          {/* Idea Content */}
          <Row>
            <Col lg={8}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h4 className="mb-3">Description</h4>
                  <p>{idea.description}</p>
                </Card.Body>
              </Card>
              
              {isAuthenticated && isCreator && (
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body className="p-4">
                    <h4 className="mb-3">Manage Idea Status</h4>
                    <p className="text-muted mb-3">
                      Update the status of your idea as it progresses through the implementation process.
                    </p>
                    
                    <div className="d-flex gap-2">
                      <Button 
                        variant={idea.status === 'proposed' ? 'warning' : 'outline-warning'}
                        onClick={() => handleUpdateStatus('proposed')}
                        disabled={idea.status === 'proposed'}
                      >
                        Proposed
                      </Button>
                      
                      <Button 
                        variant={idea.status === 'in-progress' ? 'info' : 'outline-info'}
                        onClick={() => handleUpdateStatus('in-progress')}
                        disabled={idea.status === 'in-progress'}
                      >
                        In Progress
                      </Button>
                      
                      <Button 
                        variant={idea.status === 'approved' ? 'success' : 'outline-success'}
                        onClick={() => handleUpdateStatus('approved')}
                        disabled={idea.status === 'approved'}
                      >
                        Approved
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
            
            <Col lg={4}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h4 className="mb-3">Idea Stats</h4>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span>Votes</span>
                    <strong>{idea.votes}</strong>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span>Status</span>
                    <Badge 
                      bg={getStatusColor(idea.status)}
                      text={idea.status === 'proposed' ? 'dark' : 'white'}
                    >
                      {idea.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span>Submitted</span>
                    <strong>{idea.createdAt}</strong>
                  </div>
                  
                  {club && (
                    <div className="d-flex justify-content-between">
                      <span>Club</span>
                      <Link to={`/clubs/${club.id}`} className="text-decoration-none">
                        {club.name}
                      </Link>
                    </div>
                  )}
                </Card.Body>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h4 className="mb-3">Related Ideas</h4>
                  <p className="text-muted">
                    Explore more innovative ideas from students:
                  </p>
                  
                  <ul className="list-unstyled">
                    {/* In a real app, you would fetch related ideas based on tags or club */}
                    <li className="mb-2">
                      <Link to="/ideas/1" className="text-decoration-none">Smart Campus App</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/ideas/2" className="text-decoration-none">Virtual Reality Lab</Link>
                    </li>
                    <li>
                      <Link to="/ideas/3" className="text-decoration-none">Student Marketplace</Link>
                    </li>
                  </ul>
                  
                  <div className="mt-3">
                    <Button as={Link} to="/ideas" variant="outline-primary" size="sm">
                      View All Ideas
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default IdeaDetails;