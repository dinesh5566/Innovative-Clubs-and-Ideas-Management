import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ClubCard = ({ club }) => {
  return (
    <Card className="h-100">
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
            <Badge bg="light" text="dark">{club.category}</Badge>
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
        
        <div className="d-flex justify-content-between">
          <Button 
            as={Link} 
            to={`/clubs/${club.id}`} 
            variant="outline-primary" 
            size="sm"
          >
            View Details
          </Button>
          
          <Button 
            as={Link} 
            to={`/events/create?clubId=${club.id}`} 
            variant="outline-success" 
            size="sm"
          >
            Create Event
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClubCard;