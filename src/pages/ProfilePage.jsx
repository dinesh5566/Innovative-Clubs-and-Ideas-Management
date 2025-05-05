import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Full Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  department: Yup.string()
    .required('Department is required'),
  year: Yup.string()
    .required('Year is required'),
  bio: Yup.string()
    .max(250, 'Bio must be less than 250 characters')
});

const ProfilePage = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { success, error } = useNotification();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: '/profile' } }} />;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      // In a real app, you would update the user profile on the server
      // For now, we'll just simulate a delay and show a success message
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update user in localStorage for demo purposes
      localStorage.setItem('currentUser', JSON.stringify({
        ...currentUser,
        ...values
      }));
      
      // Refresh the page to see the updated profile
      window.location.reload();
      
      success('Profile updated successfully');
      setEditing(false);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      error('Failed to update profile');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const departments = [
    'Computer Science and Engineering',
    'Electronics and Communication Engineering',
    'Electrical and Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology',
    'Artificial Intelligence and Data Science',
    'Artificial Intelligence and Machine Learning'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Profile</h1>

      <Row>
        <Col lg={4} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm text-center">
            <Card.Body className="p-4">
              <div className="mb-4">
                <img
                  src={currentUser.profileImage || "https://tse2.mm.bing.net/th?id=OIP.GqGVPkLpUlSo5SmeDogUdwHaHa&pid=Api&P=0&h=180"}
                  alt={currentUser.name}
                  className="rounded-circle img-thumbnail"
                  width="150"
                  height="150"
                />
              </div>
              
              <h4>{currentUser.name}</h4>
              <p className="text-muted mb-3">{currentUser.email}</p>
              
              <div className="d-flex justify-content-center gap-2 mb-3">
                <Badge bg="primary">{currentUser.department}</Badge>
                <Badge bg="secondary">{currentUser.year}</Badge>
                <Badge bg="info">{currentUser.role}</Badge>
              </div>
              
              <div className="d-grid gap-2">
                <Button 
                  variant="outline-primary" 
                  onClick={() => setEditing(true)}
                  disabled={editing}
                >
                  Edit Profile
                </Button>
                
                <Button 
                  variant="outline-danger" 
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm mt-4">
            <Card.Body className="p-4">
              <h5 className="mb-3">Account Overview</h5>
              
              <div className="mb-3">
                <small className="text-muted d-block">Member Since</small>
                <strong>August 2023</strong>
              </div>
              
              <div className="mb-3">
                <small className="text-muted d-block">Last Login</small>
                <strong>Today</strong>
              </div>
              
              <div>
                <small className="text-muted d-block">Account Status</small>
                <Badge bg="success">Active</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              {editing ? (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Edit Profile</h4>
                    <Button
                      variant="link"
                      className="text-decoration-none p-0"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                  
                  <Formik
                    initialValues={{
                      name: currentUser.name || '',
                      email: currentUser.email || '',
                      department: currentUser.department || '',
                      year: currentUser.year || '',
                      bio: currentUser.bio || '',
                      profileImage: currentUser.profileImage || ''
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
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Group>
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.name && !!errors.name}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.name}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          
                          <Col md={6} className="mb-3">
                            <Form.Group>
                              <Form.Label>Email Address</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.email && !!errors.email}
                                disabled  // Email can't be changed for demo purposes
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Group>
                              <Form.Label>Department</Form.Label>
                              <Form.Select
                                name="department"
                                value={values.department}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.department && !!errors.department}
                              >
                                <option value="">Select your department</option>
                                {departments.map((dept, index) => (
                                  <option key={index} value={dept}>{dept}</option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.department}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          
                          <Col md={6} className="mb-3">
                            <Form.Group>
                              <Form.Label>Year</Form.Label>
                              <Form.Select
                                name="year"
                                value={values.year}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.year && !!errors.year}
                              >
                                <option value="">Select your year</option>
                                {years.map((year, index) => (
                                  <option key={index} value={year}>{year}</option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.year}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Bio</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="bio"
                            value={values.bio}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.bio && !!errors.bio}
                            placeholder="Tell us a bit about yourself"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.bio}
                          </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                          <Form.Label>Profile Image URL</Form.Label>
                          <Form.Control
                            type="text"
                            name="profileImage"
                            value={values.profileImage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter URL for your profile image"
                          />
                          <Form.Text className="text-muted">
                            Leave blank to use the default profile image.
                          </Form.Text>
                        </Form.Group>
                        
                        <div className="d-grid">
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting || loading}
                          >
                            {loading ? 'Saving Changes...' : 'Save Changes'}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Profile Information</h4>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setEditing(true)}
                    >
                      <i className="bi bi-pencil me-1"></i> Edit
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <h5>Personal Information</h5>
                    <Row className="mt-3">
                      <Col md={6} className="mb-3">
                        <div>
                          <strong className="d-block">Full Name</strong>
                          <span>{currentUser.name}</span>
                        </div>
                      </Col>
                      
                      <Col md={6} className="mb-3">
                        <div>
                          <strong className="d-block">Email Address</strong>
                          <span>{currentUser.email}</span>
                        </div>
                      </Col>
                      
                      <Col md={6} className="mb-3">
                        <div>
                          <strong className="d-block">Department</strong>
                          <span>{currentUser.department}</span>
                        </div>
                      </Col>
                      
                      <Col md={6} className="mb-3">
                        <div>
                          <strong className="d-block">Year</strong>
                          <span>{currentUser.year}</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  
                  <div className="mb-4">
                    <h5>Bio</h5>
                    <p className="mt-2">
                      {currentUser.bio || 'No bio information provided yet.'}
                    </p>
                  </div>
                  
                  <div>
                    <h5>Account Settings</h5>
                    <div className="mt-3">
                      <Button variant="outline-danger" size="sm">
                        <i className="bi bi-shield-lock me-1"></i> Change Password
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm mt-4">
            <Card.Body className="p-4">
              <h4 className="mb-3">Activity Overview</h4>
              
              <Row>
                <Col md={4} className="mb-3 mb-md-0">
                  <Card className="h-100 border-0 bg-light">
                    <Card.Body className="text-center">
                      <div className="mb-2">
                        <i className="bi bi-people-fill text-primary fs-1"></i>
                      </div>
                      <h2 className="mb-1">2</h2>
                      <p className="text-muted mb-0">Clubs Joined</p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4} className="mb-3 mb-md-0">
                  <Card className="h-100 border-0 bg-light">
                    <Card.Body className="text-center">
                      <div className="mb-2">
                        <i className="bi bi-calendar-event-fill text-success fs-1"></i>
                      </div>
                      <h2 className="mb-1">5</h2>
                      <p className="text-muted mb-0">Events Attended</p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4}>
                  <Card className="h-100 border-0 bg-light">
                    <Card.Body className="text-center">
                      <div className="mb-2">
                        <i className="bi bi-lightbulb-fill text-warning fs-1"></i>
                      </div>
                      <h2 className="mb-1">3</h2>
                      <p className="text-muted mb-0">Ideas Shared</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;