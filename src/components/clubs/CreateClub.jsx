import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useClubs } from '../../contexts/ClubContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Club name is required')
    .min(3, 'Club name must be at least 3 characters')
    .max(50, 'Club name must be less than 50 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters'),
  category: Yup.string()
    .required('Category is required'),
  president: Yup.string()
    .required('President name is required'),
  faculty: Yup.string()
    .required('Faculty advisor name is required')
});

const CreateClub = () => {
  const { createClub } = useClubs();
  const { isAuthenticated, currentUser } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login', { state: { from: { pathname: '/clubs/create' } } });
    return null;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const newClub = await createClub({
        ...values,
        president: currentUser.name // Use current user as president
      });
      success('Club created successfully!');
      navigate(`/clubs/${newClub.id}`);
    } catch (err) {
      error('Failed to create club. Please try again.',err);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const categories = [
    'Technology',
    'Business',
    'Science',
    'Arts',
    'Sports',
    'Literature',
    'Environment',
    'Social',
    'Music',
    'Photography',
    'Dance',
    'Other'
  ];

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h1>Create a New Club</h1>
        <p className="text-muted">
          Start a new student club to connect with peers who share your interests.
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
                  category: '',
                  president: currentUser.name,
                  faculty: '',
                  logo: ''
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
                      <Form.Label>Club Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && !!errors.name}
                        placeholder="Enter club name"
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
                        placeholder="Describe the purpose and activities of your club"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Row>
                      <Col md={6} className="mb-4">
                        <Form.Group>
                          <Form.Label>Category</Form.Label>
                          <Form.Select
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.category && !!errors.category}
                          >
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.category}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6} className="mb-4">
                        <Form.Group>
                          <Form.Label>Club President</Form.Label>
                          <Form.Control
                            type="text"
                            name="president"
                            value={values.president}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.president && !!errors.president}
                            placeholder="Enter president's name"
                            disabled // Disabled because current user is the president
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.president}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Faculty Advisor</Form.Label>
                      <Form.Control
                        type="text"
                        name="faculty"
                        value={values.faculty}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.faculty && !!errors.faculty}
                        placeholder="Enter faculty advisor's name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.faculty}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Club Logo URL (Optional)</Form.Label>
                      <Form.Control
                        type="text"
                        name="logo"
                        value={values.logo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter URL for club logo image"
                      />
                      <Form.Text className="text-muted">
                        Provide a URL to an image that represents your club. If left blank, a default logo will be used.
                      </Form.Text>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-between">
                      <Button 
                        as={Link} 
                        to="/clubs" 
                        variant="outline-secondary"
                      >
                        Cancel
                      </Button>
                      
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting || loading}
                      >
                        {loading ? 'Creating Club...' : 'Create Club'}
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
              <h5 className="mb-3">Club Guidelines</h5>
              <p className="text-muted small mb-0">
                Before creating a club, please make sure to review the following guidelines:
              </p>
              <ul className="text-muted small mt-2">
                <li>Clubs must have a clear purpose and mission.</li>
                <li>Clubs must have at least 5 members to be officially recognized.</li>
                <li>All clubs must have a faculty advisor for supervision.</li>
                <li>Club activities must align with SVIT College's values and policies.</li>
                <li>Clubs must organize at least one event per semester.</li>
                <li>Club presidents are responsible for maintaining active membership.</li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="mb-3">Need Help?</h5>
              <p className="text-muted small">
                If you have any questions about creating or managing a club, contact the Student Activities Office:
              </p>
              <p className="small mb-0">
                <i className="bi bi-envelope me-2"></i> activities@svit.edu.in<br />
                <i className="bi bi-telephone me-2"></i> +91 987-654-3210
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateClub;