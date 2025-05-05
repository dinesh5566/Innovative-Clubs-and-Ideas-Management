import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function
 * @param {Function} onSubmit - Function to call on valid submission
 * @returns {Object} - Form state and handlers
 */
function useFormValidation(initialValues, validate, onSubmit) {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Run validation on values change
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const validationErrors = validate ? validate(values) : {};
      setErrors(validationErrors);
      setIsValid(Object.keys(validationErrors).length === 0);
    }
  }, [values, touched, validate]);

  // Handle form submission
  useEffect(() => {
    if (isSubmitting && isValid && onSubmit) {
      onSubmit(values);
    }
    
    // Reset isSubmitting state regardless of validity
    setIsSubmitting(false);
  }, [isSubmitting, isValid, values, onSubmit]);

  // Handle input change
  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    
    // Handle different input types
    const inputValue = type === 'checkbox' ? checked : value;
    
    setValues((prevValues) => ({
      ...prevValues,
      [name]: inputValue
    }));
    
    // Mark field as touched when changed
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true
    }));
  }, []);

  // Handle blur event
  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    
    // Mark field as touched when blurred
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true
    }));
  }, []);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues || {});
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set a specific field value
  const setFieldValue = useCallback((name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  }, []);

  // Set a specific field as touched
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: isTouched
    }));
  }, []);

  // Set a specific field error
  const setFieldError = useCallback((name, error) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((event) => {
    if (event) {
      event.preventDefault();
    }
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setTouched(allTouched);
    
    // Validate form and set isSubmitting
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
    setIsSubmitting(true);
  }, [values, validate]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldTouched,
    setFieldError
  };
}

export default useFormValidation;