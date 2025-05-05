// In a real application, this service would interact with a backend API
// For now, we'll simulate CRUD operations using localStorage

const IDEAS_KEY = 'ideas_data';

// Sample data for initial setup
const sampleIdeas = [
  {
    id: '1',
    title: 'Smart Campus App',
    description: 'A mobile app that helps students navigate the campus, check class schedules, and get real-time updates.',
    creator: 'Suresh Kumar',
    clubId: '1',
    status: 'in-progress',
    votes: 32,
    createdAt: '2023-04-05',
    tags: ['mobile', 'technology', 'campus']
  },
  {
    id: '2',
    title: 'Virtual Reality Lab',
    description: 'Setting up a VR lab for immersive learning experiences across different subjects.',
    creator: 'Aarti Singh',
    clubId: '1',
    status: 'proposed',
    votes: 27,
    createdAt: '2023-04-12',
    tags: ['vr', 'education', 'innovation']
  },
  {
    id: '3',
    title: 'Student Marketplace',
    description: 'An online platform for students to buy and sell used books, electronics, and other items within the campus community.',
    creator: 'Rahul Verma',
    clubId: '2',
    status: 'approved',
    votes: 45,
    createdAt: '2023-03-28',
    tags: ['marketplace', 'business', 'students']
  },
  {
    id: '4',
    title: 'Automated Waste Sorter',
    description: 'A robot that can automatically sort different types of waste for better recycling on campus.',
    creator: 'Deepa Nair',
    clubId: '3',
    status: 'proposed',
    votes: 19,
    createdAt: '2023-04-18',
    tags: ['robotics', 'environment', 'sustainability']
  }
];

// Initialize the ideas data in localStorage if it doesn't exist
const initializeIdeas = () => {
  if (!localStorage.getItem(IDEAS_KEY)) {
    localStorage.setItem(IDEAS_KEY, JSON.stringify(sampleIdeas));
  }
  return getIdeas();
};

/**
 * Get all ideas
 * @returns {Promise} - Promise resolving to an array of ideas
 */
export const getIdeas = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const ideas = localStorage.getItem(IDEAS_KEY);
  return ideas ? JSON.parse(ideas) : initializeIdeas();
};

/**
 * Get an idea by ID
 * @param {string} id - Idea ID
 * @returns {Promise} - Promise resolving to the idea or null if not found
 */
export const getIdeaById = async (id) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const ideas = await getIdeas();
  const idea = ideas.find(idea => idea.id === id);
  
  if (!idea) {
    return Promise.reject(new Error('Idea not found'));
  }
  
  return idea;
};

/**
 * Get ideas by club ID
 * @param {string} clubId - Club ID
 * @returns {Promise} - Promise resolving to an array of ideas
 */
export const getIdeasByClubId = async (clubId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const ideas = await getIdeas();
  return ideas.filter(idea => idea.clubId === clubId);
};

/**
 * Create a new idea
 * @param {Object} ideaData - Idea data
 * @returns {Promise} - Promise resolving to the created idea
 */
export const createIdea = async (ideaData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Validate required fields
  if (!ideaData.title || !ideaData.description || !ideaData.clubId) {
    return Promise.reject(new Error('Missing required fields'));
  }
  
  const ideas = await getIdeas();
  
  // Create a new idea object
  const newIdea = {
    id: Math.random().toString(36).substr(2, 9),
    ...ideaData,
    votes: 0,
    createdAt: new Date().toISOString().slice(0, 10),
    status: 'proposed'
  };
  
  // Add to ideas array and save to localStorage
  ideas.push(newIdea);
  localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
  
  // In a real app, you would also update the club's ideas array
  
  return newIdea;
};

/**
 * Update an idea
 * @param {string} id - Idea ID
 * @param {Object} ideaData - Updated idea data
 * @returns {Promise} - Promise resolving to the updated idea
 */
export const updateIdea = async (id, ideaData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const ideas = await getIdeas();
  const ideaIndex = ideas.findIndex(idea => idea.id === id);
  
  if (ideaIndex === -1) {
    return Promise.reject(new Error('Idea not found'));
  }
  
  // Update idea data
  const updatedIdea = {
    ...ideas[ideaIndex],
    ...ideaData
  };
  
  // Save to localStorage
  ideas[ideaIndex] = updatedIdea;
  localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
  
  return updatedIdea;
};

/**
 * Delete an idea
 * @param {string} id - Idea ID
 * @returns {Promise} - Promise resolving to true on success
 */
export const deleteIdea = async (id) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const ideas = await getIdeas();
  const filteredIdeas = ideas.filter(idea => idea.id !== id);
  
  if (filteredIdeas.length === ideas.length) {
    return Promise.reject(new Error('Idea not found'));
  }
  
  // Save to localStorage
  localStorage.setItem(IDEAS_KEY, JSON.stringify(filteredIdeas));
  
  // In a real app, you would also update the club's ideas array
  
  return true;
};

/**
 * Vote for an idea
 * @param {string} id - Idea ID
 * @param {string} userId - User ID
 * @returns {Promise} - Promise resolving to the updated idea
 */
export const voteIdea = async (id, userId = null) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const idea = await getIdeaById(id);
  
  // In a real app, you would check if the user has already voted
  // and maintain a list of users who have voted for each idea
  
  // Update the vote count
  const updatedIdea = {
    ...idea,
    votes: idea.votes + 1
  };
  
  return updateIdea(id, updatedIdea);
};

/**
 * Update idea status
 * @param {string} id - Idea ID
 * @param {string} status - New status (proposed, in-progress, approved, rejected)
 * @returns {Promise} - Promise resolving to the updated idea
 */
export const updateIdeaStatus = async (id, status) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Validate status
  const validStatuses = ['proposed', 'in-progress', 'approved', 'rejected'];
  if (!validStatuses.includes(status)) {
    return Promise.reject(new Error('Invalid status'));
  }
  
  const idea = await getIdeaById(id);
  
  // Update the status
  const updatedIdea = {
    ...idea,
    status: status
  };
  
  return updateIdea(id, updatedIdea);
};

export default {
  getIdeas,
  getIdeaById,
  getIdeasByClubId,
  createIdea,
  updateIdea,
  deleteIdea,
  voteIdea,
  updateIdeaStatus
};