// Form validation helpers
import { VALIDATION } from './constant';

/**
 * Validate an email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check if a string is empty
 * @param {string} value - String to check
 * @returns {boolean} - True if empty, false otherwise
 */
export const isEmpty = (value) => {
  return value === undefined || value === null || value.trim() === '';
};

/**
 * Check if a string meets minimum length
 * @param {string} value - String to check
 * @param {number} minLength - Minimum length
 * @returns {boolean} - True if valid, false otherwise
 */
export const meetsMinLength = (value, minLength) => {
  if (!value) return false;
  return value.length >= minLength;
};

/**
 * Check if a string exceeds maximum length
 * @param {string} value - String to check
 * @param {number} maxLength - Maximum length
 * @returns {boolean} - True if valid, false otherwise
 */
export const meetsMaxLength = (value, maxLength) => {
  if (!value) return true;
  return value.length <= maxLength;
};

/**
 * Check if a value is a valid number
 * @param {string|number} value - Value to check
 * @returns {boolean} - True if valid, false otherwise
 */
export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Check if a value is a valid date string
 * @param {string} dateString - Date string to check
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Check if a date is in the future
 * @param {string} dateString - Date string to check
 * @returns {boolean} - True if in the future, false otherwise
 */
export const isFutureDate = (dateString) => {
  if (!isValidDate(dateString)) return false;
  
  const date = new Date(dateString);
  const today = new Date();
  
  today.setHours(0, 0, 0, 0);
  
  return date >= today;
};

/**
 * Check if two passwords match
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirmation password
 * @returns {boolean} - True if match, false otherwise
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Check if a password is strong
 * @param {string} password - Password to check
 * @returns {boolean} - True if strong, false otherwise
 */
export const isStrongPassword = (password) => {
  if (!password) return false;
  
  // Password must be at least 8 characters long
  // and contain at least one uppercase letter, one lowercase letter,
  // one number, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate user registration form
 * @param {Object} values - Form values
 * @returns {Object} - Validation errors
 */
export const validateRegistrationForm = (values) => {
  const errors = {};
  
  if (isEmpty(values.name)) {
    errors.name = 'Full Name is required';
  } else if (!meetsMinLength(values.name, VALIDATION.NAME_MIN_LENGTH)) {
    errors.name = `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
  }
  
  if (isEmpty(values.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (isEmpty(values.password)) {
    errors.password = 'Password is required';
  } else if (!meetsMinLength(values.password, VALIDATION.PASSWORD_MIN_LENGTH)) {
    errors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
  }
  
  if (isEmpty(values.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (!passwordsMatch(values.password, values.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }
  
  if (isEmpty(values.department)) {
    errors.department = 'Department is required';
  }
  
  if (isEmpty(values.year)) {
    errors.year = 'Year is required';
  }
  
  if (!values.termsAccepted) {
    errors.termsAccepted = 'You must accept the terms and conditions';
  }
  
  return errors;
};

/**
 * Validate login form
 * @param {Object} values - Form values
 * @returns {Object} - Validation errors
 */
export const validateLoginForm = (values) => {
  const errors = {};
  
  if (isEmpty(values.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (isEmpty(values.password)) {
    errors.password = 'Password is required';
  }
  
  return errors;
};

/**
 * Validate club creation form
 * @param {Object} values - Form values
 * @returns {Object} - Validation errors
 */
export const validateClubForm = (values) => {
  const errors = {};
  
  if (isEmpty(values.name)) {
    errors.name = 'Club name is required';
  } else if (!meetsMinLength(values.name, VALIDATION.NAME_MIN_LENGTH)) {
    errors.name = `Club name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
  } else if (!meetsMaxLength(values.name, VALIDATION.NAME_MAX_LENGTH)) {
    errors.name = `Club name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`;
  }
  
  if (isEmpty(values.description)) {
    errors.description = 'Description is required';
  } else if (!meetsMinLength(values.description, VALIDATION.DESCRIPTION_MIN_LENGTH)) {
    errors.description = `Description must be at least ${VALIDATION.DESCRIPTION_MIN_LENGTH} characters`;
  }
  
  if (isEmpty(values.category)) {
    errors.category = 'Category is required';
  }
  
  if (isEmpty(values.president)) {
    errors.president = 'President name is required';
  }
  
  if (isEmpty(values.faculty)) {
    errors.faculty = 'Faculty advisor name is required';
  }
  
  return errors;
};

/**
 * Validate idea creation form
 * @param {Object} values - Form values
 * @returns {Object} - Validation errors
 */
export const validateIdeaForm = (values) => {
  const errors = {};
  
  if (isEmpty(values.title)) {
    errors.title = 'Title is required';
  } else if (!meetsMinLength(values.title, VALIDATION.TITLE_MIN_LENGTH)) {
    errors.title = `Title must be at least ${VALIDATION.TITLE_MIN_LENGTH} characters`;
  } else if (!meetsMaxLength(values.title, VALIDATION.TITLE_MAX_LENGTH)) {
    errors.title = `Title must be less than ${VALIDATION.TITLE_MAX_LENGTH} characters`;
  }
  
  if (isEmpty(values.description)) {
    errors.description = 'Description is required';
  } else if (!meetsMinLength(values.description, VALIDATION.DESCRIPTION_MIN_LENGTH)) {
    errors.description = `Description must be at least ${VALIDATION.DESCRIPTION_MIN_LENGTH} characters`;
  }
  
  if (isEmpty(values.clubId)) {
    errors.clubId = 'Please select a club';
  }
  
  if (isEmpty(values.tags)) {
    errors.tags = 'Please add at least one tag';
  }
  
  return errors;
};

/**
 * Validate event creation form
 * @param {Object} values - Form values
 * @returns {Object} - Validation errors
 */
export const validateEventForm = (values) => {
  const errors = {};
  
  if (isEmpty(values.name)) {
    errors.name = 'Event name is required';
  } else if (!meetsMinLength(values.name, VALIDATION.TITLE_MIN_LENGTH)) {
    errors.name = `Event name must be at least ${VALIDATION.TITLE_MIN_LENGTH} characters`;
  } else if (!meetsMaxLength(values.name, VALIDATION.TITLE_MAX_LENGTH)) {
    errors.name = `Event name must be less than ${VALIDATION.TITLE_MAX_LENGTH} characters`;
  }
  
  if (isEmpty(values.description)) {
    errors.description = 'Description is required';
  } else if (!meetsMinLength(values.description, VALIDATION.DESCRIPTION_MIN_LENGTH)) {
    errors.description = `Description must be at least ${VALIDATION.DESCRIPTION_MIN_LENGTH} characters`;
  }
  
  if (isEmpty(values.date)) {
    errors.date = 'Date is required';
  } else if (!isValidDate(values.date)) {
    errors.date = 'Please enter a valid date';
  }
  
  if (isEmpty(values.time)) {
    errors.time = 'Time is required';
  }
  
  if (isEmpty(values.venue)) {
    errors.venue = 'Venue is required';
  }
  
  if (isEmpty(values.clubId)) {
    errors.clubId = 'Please select a club';
  }
  
  return errors;
};

/**
 * Validate profile form
 * @param {Object} values - Form values
 * @returns {Object} - Validation errors
 */
export const validateProfileForm = (values) => {
  const errors = {};
  
  if (isEmpty(values.name)) {
    errors.name = 'Full Name is required';
  } else if (!meetsMinLength(values.name, VALIDATION.NAME_MIN_LENGTH)) {
    errors.name = `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
  }
  
  if (isEmpty(values.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (isEmpty(values.department)) {
    errors.department = 'Department is required';
  }
  
  if (isEmpty(values.year)) {
    errors.year = 'Year is required';
  }
  
  if (values.bio && !meetsMaxLength(values.bio, VALIDATION.BIO_MAX_LENGTH)) {
    errors.bio = `Bio must be less than ${VALIDATION.BIO_MAX_LENGTH} characters`;
  }
  
  return errors;
};

export default {
  isValidEmail,
  isEmpty,
  meetsMinLength,
  meetsMaxLength,
  isNumber,
  isValidDate,
  isFutureDate,
  passwordsMatch,
  isStrongPassword,
  validateRegistrationForm,
  validateLoginForm,
  validateClubForm,
  validateIdeaForm,
  validateEventForm,
  validateProfileForm
};