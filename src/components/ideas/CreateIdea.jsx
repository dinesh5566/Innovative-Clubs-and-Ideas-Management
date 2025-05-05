// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useClubs } from '../../contexts/ClubContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters'),
  clubId: Yup.string()
    .required('Please select a club'),
  tags: Yup.string()
    .required('Please add at least one tag')
});

const CreateIdea = () => {
  const { clubs, createIdea } = useClubs();
  const { isAuthenticated, currentUser } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Get clubId from query params if available
  const queryParams = new URLSearchParams(location.search);
  const preselectedClubId = queryParams.get('clubId') || '';

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login', { state: { from: { pathname: '/ideas/create' } } });
    return null;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      // Convert comma-separated tags to array
      const tagsArray = values.tags
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag !== '');

      const newIdea = await createIdea({
        ...values,
        creator: currentUser.name,
        tags: tagsArray
      });
      
      success('Idea shared successfully!');
      navigate(`/ideas/${newIdea.id}`);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      error('Failed to share idea. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h1>Share Your Innovative Idea</h1>
        <p className="text-muted">
          Share your innovative idea with the SVIT community and get feedback from peers.
        </p>
      </div>
      
      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Formik
                initialValues={{
                  title: '',
                  description: '',
                  clubId: preselectedClubId,
                  tags: ''
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
                      <Form.Label>Idea Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.title && !!errors.title}
                        placeholder="Enter a concise title for your idea"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.description && !!errors.description}
                        placeholder="Describe your idea in detail, including its purpose, benefits, and implementation details"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
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
                      <Form.Label>Tags</Form.Label>
                      <Form.Control
                        type="text"
                        name="tags"
                        value={values.tags}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.tags && !!errors.tags}
                        placeholder="Enter comma-separated tags (e.g., technology, education, campus)"
                      />
                      <Form.Text className="text-muted">
                        Add tags to help others find your idea. Separate tags with commas.
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.tags}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-between">
                      <Button 
                        as={Link} 
                        to="/ideas" 
                        variant="outline-secondary"
                      >
                        Cancel
                      </Button>
                      
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting || loading}
                      >
                        {loading ? 'Sharing Idea...' : 'Share Idea'}
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
              <h5 className="mb-3">Tips for Sharing Ideas</h5>
              <ul className="text-muted small">
                <li className="mb-2">Be specific and clear about your idea.</li>
                <li className="mb-2">Explain the problem your idea is solving.</li>
                <li className="mb-2">Highlight the benefits and impact of your idea.</li>
                <li className="mb-2">Consider the feasibility and resources needed.</li>
                <li className="mb-2">Use relevant tags to help others find your idea.</li>
                <li>Be open to feedback and collaboration.</li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="mb-3">What Happens Next?</h5>
              <p className="text-muted small mb-0">
                After sharing your idea:
              </p>
              <ol className="text-muted small mt-2">
                <li className="mb-2">Community members can vote on your idea.</li>
                <li className="mb-2">Club leaders may provide feedback.</li>
                <li className="mb-2">Ideas with high votes get reviewed by faculty.</li>
                <li>Approved ideas may receive resources for implementation.</li>
              </ol>
              <hr className="my-3" />
              <p className="small mb-0">
                <i className="bi bi-info-circle me-2"></i>
                You can update the status of your idea as it progresses.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateIdea;