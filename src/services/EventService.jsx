// In a real application, this service would interact with a backend API
// For now, we'll simulate CRUD operations using localStorage

const EVENTS_KEY = 'events_data';

// Sample data for initial setup
const sampleEvents = [
  {
    id: '1',
    name: 'Hackathon 2023',
    description: 'A 24-hour coding competition to solve real-world problems using technology.',
    date: '2023-05-15',
    time: '09:00 AM',
    venue: 'Main Auditorium',
    clubId: '1',
    attendees: 120,
    status: 'upcoming',
    image: '/assets/images/hackathon.jpg'
  },
  {
    id: '2',
    name: 'Startup Pitch Day',
    description: 'Present your startup ideas to investors and win funding for your venture.',
    date: '2023-06-20',
    time: '10:00 AM',
    venue: 'Seminar Hall B',
    clubId: '2',
    attendees: 75,
    status: 'upcoming',
    image: '/assets/images/pitch-day.jpg'
  },
  {
    id: '3',
    name: 'Tech Workshop',
    description: 'Learn the basics of web development and create your first website.',
    date: '2023-05-10',
    time: '02:00 PM',
    venue: 'Computer Lab 2',
    clubId: '1',
    attendees: 40,
    status: 'completed',
    image: '/assets/images/tech-workshop.jpg'
  },
  {
    id: '4',
    name: 'Robotics Competition',
    description: 'Showcase your robotics skills and compete for exciting prizes.',
    date: '2023-07-05',
    time: '11:00 AM',
    venue: 'Engineering Block',
    clubId: '3',
    attendees: 50,
    status: 'upcoming',
    image: '/assets/images/robotics-comp.jpg'
  }
];

// Initialize the events data in localStorage if it doesn't exist
const initializeEvents = () => {
  if (!localStorage.getItem(EVENTS_KEY)) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(sampleEvents));
  }
  return getEvents();
};

/**
 * Get all events
 * @returns {Promise} - Promise resolving to an array of events
 */
export const getEvents = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const events = localStorage.getItem(EVENTS_KEY);
  return events ? JSON.parse(events) : initializeEvents();
};

/**
 * Get an event by ID
 * @param {string} id - Event ID
 * @returns {Promise} - Promise resolving to the event or null if not found
 */
export const getEventById = async (id) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const events = await getEvents();
  const event = events.find(event => event.id === id);
  
  if (!event) {
    return Promise.reject(new Error('Event not found'));
  }
  
  return event;
};

/**
 * Get events by club ID
 * @param {string} clubId - Club ID
 * @returns {Promise} - Promise resolving to an array of events
 */
export const getEventsByClubId = async (clubId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const events = await getEvents();
  return events.filter(event => event.clubId === clubId);
};

/**
 * Create a new event
 * @param {Object} eventData - Event data
 * @returns {Promise} - Promise resolving to the created event
 */
export const createEvent = async (eventData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Validate required fields
  if (!eventData.name || !eventData.description || !eventData.date || !eventData.time || !eventData.venue || !eventData.clubId) {
    return Promise.reject(new Error('Missing required fields'));
  }
  
  const events = await getEvents();
  
  // Create a new event object
  const newEvent = {
    id: Math.random().toString(36).substr(2, 9),
    ...eventData,
    attendees: 0,
    status: eventData.status || 'upcoming'
  };
  
  // Add to events array and save to localStorage
  events.push(newEvent);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  
  // In a real app, you would also update the club's events array
  
  return newEvent;
};

/**
 * Update an event
 * @param {string} id - Event ID
 * @param {Object} eventData - Updated event data
 * @returns {Promise} - Promise resolving to the updated event
 */
export const updateEvent = async (id, eventData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const events = await getEvents();
  const eventIndex = events.findIndex(event => event.id === id);
  
  if (eventIndex === -1) {
    return Promise.reject(new Error('Event not found'));
  }
  
  // Update event data
  const updatedEvent = {
    ...events[eventIndex],
    ...eventData
  };
  
  // Save to localStorage
  events[eventIndex] = updatedEvent;
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  
  return updatedEvent;
};

/**
 * Delete an event
 * @param {string} id - Event ID
 * @returns {Promise} - Promise resolving to true on success
 */
export const deleteEvent = async (id) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const events = await getEvents();
  const filteredEvents = events.filter(event => event.id !== id);
  
  if (filteredEvents.length === events.length) {
    return Promise.reject(new Error('Event not found'));
  }
  
  // Save to localStorage
  localStorage.setItem(EVENTS_KEY, JSON.stringify(filteredEvents));
  
  // In a real app, you would also update the club's events array
  
  return true;
};

/**
 * Mark a user as attending an event
 * @param {string} eventId - Event ID
 * @param {string} userId - User ID
 * @returns {Promise} - Promise resolving to the updated event
 */
// eslint-disable-next-line no-unused-vars
export const attendEvent = async (eventId, userId = null) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const event = await getEventById(eventId);
  
  // In a real app, you would maintain a list of users attending each event
  // and check if the user is already attending
  
  // Update the attendees count
  const updatedEvent = {
    ...event,
    attendees: event.attendees + 1
  };
  
  return updateEvent(eventId, updatedEvent);
};

/**
 * Remove a user from event attendees
 * @param {string} eventId - Event ID
 * @param {string} userId - User ID
 * @returns {Promise} - Promise resolving to the updated event
 */
// eslint-disable-next-line no-unused-vars
export const cancelAttendance = async (eventId, userId = null) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const event = await getEventById(eventId);
  
  // In a real app, you would remove the user from the list of attendees
  
  // Update the attendees count
  const updatedEvent = {
    ...event,
    attendees: Math.max(0, event.attendees - 1)
  };
  
  return updateEvent(eventId, updatedEvent);
};

/**
 * Get upcoming events
 * @returns {Promise} - Promise resolving to an array of upcoming events
 */
export const getUpcomingEvents = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const events = await getEvents();
  return events.filter(event => event.status === 'upcoming');
};

/**
 * Get past events
 * @returns {Promise} - Promise resolving to an array of past events
 */
export const getPastEvents = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const events = await getEvents();
  return events.filter(event => event.status === 'completed');
};

export default {
  getEvents,
  getEventById,
  getEventsByClubId,
  createEvent,
  updateEvent,
  deleteEvent,
  attendEvent,
  cancelAttendance,
  getUpcomingEvents,
  getPastEvents
};