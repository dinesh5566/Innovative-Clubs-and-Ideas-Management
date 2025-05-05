import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useClubs } from '../../contexts/ClubContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Event name is required')
    .min(5, 'Event name must be at least 5 characters')
    .max(100, 'Event name must be less than 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters'),
  date: Yup.string()
    .required('Date is required'),
  time: Yup.string()
    .required('Time is required'),
  venue: Yup.string()
    .required('Venue is required'),
  clubId: Yup.string()
    .required('Please select a club')
});

const CreateEvent = () => {
  const { clubs, createEvent } = useClubs();
  const { isAuthenticated } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Get clubId from query params if available
  const queryParams = new URLSearchParams(location.search);
  const preselectedClubId = queryParams.get('clubId') || '';

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login', { state: { from: { pathname: '/events/create' } } });
    return null;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const newEvent = await createEvent({
        ...values,
        status: 'upcoming'
      });
      
      success('Event created successfully!');
      navigate(`/events/${newEvent.id}`);
    } catch (err) {
      error('Failed to create event. Please try again.',err);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Get current date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h1>Create a New Event</h1>
        <p className="text-muted">
          Organize an event for your club or the SVIT community.
        </p>
      </div>
      
      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Formik
                initialValues={{
                  name: '',
                  description: '',
                  date: '',
                  time: '',
                  venue: '',
                  clubId: preselectedClubId,
                  image: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label>Event Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && !!errors.name}
                        placeholder="Enter event name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.description && !!errors.description}
                        placeholder="Describe your event, including its purpose, agenda, and what attendees can expect"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Row>
                      <Col md={6} className="mb-4">
                        <Form.Group>
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            value={values.date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.date && !!errors.date}
                            min={today}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.date}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6} className="mb-4">
                        <Form.Group>
                          <Form.Label>Time</Form.Label>
                          <Form.Control
                            type="time"
                            name="time"
                            value={values.time}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.time && !!errors.time}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.time}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Venue</Form.Label>
                      <Form.Control
                        type="text"
                        name="venue"
                        value={values.venue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.venue && !!errors.venue}
                        placeholder="Enter event venue (e.g., Main Auditorium, Seminar Hall B)"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.venue}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Select Club</Form.Label>
                      <Form.Select
                        name="clubId"
                        value={values.clubId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.clubId && !!errors.clubId}
                      >
                        <option value="">Select a club</option>
                        {clubs.map(club => (
                          <option key={club.id} value={club.id}>
                            {club.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.clubId}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Event Banner Image URL (Optional)</Form.Label>
                      <Form.Control
                        type="text"
                        name="image"
                        value={values.image}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter URL for event banner image"
                      />
                      <Form.Text className="text-muted">
                        Provide a URL to an image for your event banner. If left blank, a default image will be used.
                      </Form.Text>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-between">
                      <Button 
                        as={Link} 
                        to="/events" 
                        variant="outline-secondary"
                      >
                        Cancel
                      </Button>
                      
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting || loading}
                      >
                        {loading ? 'Creating Event...' : 'Create Event'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <h5 className="mb-3">Event Planning Tips</h5>
              <ul className="text-muted small">
                <li className="mb-2">Choose a clear and descriptive event name.</li>
                <li className="mb-2">Provide a detailed description of what attendees can expect.</li>
                <li className="mb-2">Plan your event at least 1-2 weeks in advance.</li>
                <li className="mb-2">Select a venue that can accommodate your expected audience.</li>
                <li className="mb-2">Consider accessibility requirements for all attendees.</li>
                <li>Promote your event on social media and campus notice boards.</li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="mb-3">After Creating Your Event</h5>
              <p className="text-muted small mb-0">
                Once your event is created:
              </p>
              <ol className="text-muted small mt-2">
                <li className="mb-2">Share the event link with potential attendees.</li>
                <li className="mb-2">Track registrations and manage attendees.</li>
                <li className="mb-2">Send reminders as the event date approaches.</li>
                <li>After the event, consider sharing photos and outcomes.</li>
              </ol>
              <hr className="my-3" />
              <p className="small mb-0">
                <i className="bi bi-info-circle me-2"></i>
                For large events, contact the Student Activities Office for additional support.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEvent;