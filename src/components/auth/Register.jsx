import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Full Name is required').min(3, 'Name must be at least 3 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  department: Yup.string().required('Department is required'),
  year: Yup.string().required('Year is required'),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    setLoading(true);

    // Get existing users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.some(user => user.email === values.email)) {
      setFieldError('email', 'This email is already registered');
      setLoading(false);
      setSubmitting(false);
      return;
    }

    // Remove confirmPassword and termsAccepted before storing
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, termsAccepted, ...userData } = values;

    // Save new user to local storage
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now login.');
    navigate('/login');

    setLoading(false);
    setSubmitting(false);
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
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Create an Account</h2>
                <p className="text-muted">Join SVIT Clubs & Ideas to connect with clubs and share innovative ideas</p>
              </div>

              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  department: '',
                  year: '',
                  termsAccepted: false
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
                      <Col md={12} className="mb-3">
                        <Form.Group>
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.name && !!errors.name}
                            placeholder="Enter your full name"
                          />
                          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={12} className="mb-3">
                        <Form.Group>
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && !!errors.email}
                            placeholder="Enter your email address"
                          />
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && !!errors.password}
                            placeholder="Create a password"
                          />
                          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                            placeholder="Confirm your password"
                          />
                          <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

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
                          <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
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
                          <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={values.termsAccepted}
                        onChange={handleChange}
                        isInvalid={touched.termsAccepted && !!errors.termsAccepted}
                        label={<span>I agree to the <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link></span>}
                      />
                      <div className="invalid-feedback d-block">{touched.termsAccepted && errors.termsAccepted}</div>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 py-2" disabled={isSubmitting || loading}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <div className="text-center mt-4">
                      <p className="mb-0">Already have an account? <Link to="/login" className="fw-medium">Sign In</Link></p>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
