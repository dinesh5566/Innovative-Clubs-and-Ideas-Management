import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useClubs } from '../../contexts/ClubContext';

const IdeaCard = ({ idea }) => {
  const { getClubById, voteIdea } = useClubs();
  const club = idea.clubId ? getClubById(idea.clubId) : null;

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

  const handleVote = (e) => {
    e.preventDefault();
    voteIdea(idea.id);
  };

  return (
    <Card className="h-100">
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
          
          {club && (
            <>
              <span className="mx-2 text-muted">•</span>
              <img 
                src={club.logo || "/assets/images/club-placeholder.png"} 
                alt={club.name} 
                className="rounded-circle me-1" 
                width="18" 
                height="18"
              />
              <span className="small">{club.name}</span>
            </>
          )}
        </div>
        
        <p className="card-text text-truncate-2 mb-3">{idea.description}</p>
        
        <div className="d-flex flex-wrap gap-1 mb-3">
          {idea.tags.map((tag, index) => (
            <span key={index} className="badge bg-light text-dark">#{tag}</span>
          ))}
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <Button 
            onClick={handleVote}
            variant="outline-secondary" 
            size="sm"
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
  );
};

export default IdeaCard;