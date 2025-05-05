import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useClubs } from '../../contexts/ClubContext';

const EventCard = ({ event }) => {
  const { getClubById } = useClubs();
  const club = getClubById(event.clubId);

  return (
    <Card className="h-100">
      <Card.Img 
        variant="top" 
        src={event.image || "/assets/images/event-placeholder.png"} 
        alt={event.name} 
        height="140"
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
        
        <p className="text-muted mb-3 small">
          <i className="bi bi-calendar me-1"></i> {event.date}<br />
          <i className="bi bi-clock me-1"></i> {event.time}<br />
          <i className="bi bi-geo-alt me-1"></i> {event.venue}
        </p>
        
        {club && (
          <div className="d-flex align-items-center mb-3">
            <img 
              src={club.logo || "/assets/images/club-placeholder.png"} 
              alt={club.name} 
              className="rounded-circle me-2" 
              width="24" 
              height="24"
            />
            <span className="small">{club.name}</span>
          </div>
        )}
        
        <div className="d-flex justify-content-between align-items-center">
          <span className="small text-muted">
            <i className="bi bi-people me-1"></i> {event.attendees} attending
          </span>
          
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
    </Card>
  );
};

export default EventCard;