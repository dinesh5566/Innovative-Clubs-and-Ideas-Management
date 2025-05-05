// Application Constants

// API Routes (for use in a real app with backend)
export const API_BASE_URL = 'https://api.svitclubs.com/api/v1';

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    PROFILE: '/auth/profile'
  },
  CLUBS: {
    LIST: '/clubs',
    DETAIL: (id) => `/clubs/${id}`,
    CREATE: '/clubs',
    UPDATE: (id) => `/clubs/${id}`,
    DELETE: (id) => `/clubs/${id}`,
    JOIN: (id) => `/clubs/${id}/join`,
    LEAVE: (id) => `/clubs/${id}/leave`,
  },
  IDEAS: {
    LIST: '/ideas',
    DETAIL: (id) => `/ideas/${id}`,
    CREATE: '/ideas',
    UPDATE: (id) => `/ideas/${id}`,
    DELETE: (id) => `/ideas/${id}`,
    VOTE: (id) => `/ideas/${id}/vote`,
    BY_CLUB: (clubId) => `/clubs/${clubId}/ideas`
  },
  EVENTS: {
    LIST: '/events',
    DETAIL: (id) => `/events/${id}`,
    CREATE: '/events',
    UPDATE: (id) => `/events/${id}`,
    DELETE: (id) => `/events/${id}`,
    ATTEND: (id) => `/events/${id}/attend`,
    CANCEL_ATTENDANCE: (id) => `/events/${id}/cancel-attendance`,
    BY_CLUB: (clubId) => `/clubs/${clubId}/events`,
    UPCOMING: '/events/upcoming',
    PAST: '/events/past'
  }
};

// LocalStorage Keys
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'svit_auth_token',
  REFRESH_TOKEN: 'svit_refresh_token',
  CURRENT_USER: 'currentUser',
  CLUBS_DATA: 'clubs_data',
  IDEAS_DATA: 'ideas_data',
  EVENTS_DATA: 'events_data',
  THEME: 'svit_theme_preference'
};

// Form Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MIN_LENGTH: 20,
  TITLE_MIN_LENGTH: 5,
  TITLE_MAX_LENGTH: 100,
  BIO_MAX_LENGTH: 250
};

// Academic Departments
export const DEPARTMENTS = [
  'Computer Science and Engineering',
  'Electronics and Communication Engineering',
  'Electrical and Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
  'Artificial Intelligence and Data Science',
  'Artificial Intelligence and Machine Learning'
];

// Academic Years
export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

// Club Categories
export const CLUB_CATEGORIES = [
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

// Idea Statuses
export const IDEA_STATUSES = [
  { value: 'proposed', label: 'Proposed', color: 'warning' },
  { value: 'in-progress', label: 'In Progress', color: 'info' },
  { value: 'approved', label: 'Approved', color: 'success' },
  { value: 'rejected', label: 'Rejected', color: 'danger' }
];

// Event Statuses
export const EVENT_STATUSES = [
  { value: 'upcoming', label: 'Upcoming', color: 'success' },
  { value: 'completed', label: 'Completed', color: 'secondary' },
  { value: 'cancelled', label: 'Cancelled', color: 'danger' }
];

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student'
};

// Default Page Sizes
export const PAGE_SIZES = [10, 20, 50, 100];

// Default Pagination Options
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  PAGE_SIZE: 10
};

// Default Images
export const DEFAULT_IMAGES = {
  PROFILE: '/assets/images/default-profile.png',
  CLUB: '/assets/images/club-placeholder.png',
  EVENT: '/assets/images/event-placeholder.jpg'
};

// App Theme Options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

export default {
  API_BASE_URL,
  API_ROUTES,
  LOCAL_STORAGE_KEYS,
  VALIDATION,
  DEPARTMENTS,
  YEARS,
  CLUB_CATEGORIES,
  IDEA_STATUSES,
  EVENT_STATUSES,
  USER_ROLES,
  PAGE_SIZES,
  DEFAULT_PAGINATION,
  DEFAULT_IMAGES,
  THEMES
};