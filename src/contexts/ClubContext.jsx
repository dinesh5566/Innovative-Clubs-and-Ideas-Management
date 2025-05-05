import React, { createContext, useState, useContext, useEffect } from 'react';

const ClubContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useClubs = () => {
  return useContext(ClubContext);
};

// Sample data
const sampleClubs = [
  {
    id: '1',
    name: 'Tech Innovators',
    description: 'A club for students passionate about technology and innovation. We work on cutting-edge projects and organize tech events.',
    category: 'Technology',
    logo: 'https://img.freepik.com/free-vector/innovation-concept-illustration_114360-5768.jpg?ga=GA1.1.1629250849.1720450330&semt=ais_hybrid',
    members: 45,
    createdAt: '2023-01-15',
    events: ['1', '3'],
    ideas: ['1', '2'],
    president: 'Ravi Kumar',
    faculty: 'Dr. Anand Sharma'
  },
  {
    id: '2',
    name: 'Entrepreneurship Cell',
    description: 'We nurture and support student entrepreneurs to develop their business ideas and connect with industry experts.',
    category: 'Business',
    logo: 'https://img.freepik.com/free-vector/modern-infographic-creative-template_23-2147493682.jpg?ga=GA1.1.1629250849.1720450330&semt=ais_hybrid',
    members: 32,
    createdAt: '2023-02-10',
    events: ['2'],
    ideas: ['3'],
    president: 'Priya Reddy',
    faculty: 'Prof. Rajesh Gupta'
  },
  {
    id: '3',
    name: 'Robotics Club',
    description: 'Exploring the world of robotics through hands-on projects, competitions, and workshops.',
    category: 'Technology',
    logo: 'https://img.freepik.com/free-photo/father-son-making-robot_23-2148863404.jpg?ga=GA1.1.1629250849.1720450330&semt=ais_hybrid',
    members: 12,
    createdAt: '2023-03-05',
    events: ['4'],
    ideas: ['4'],
    president: 'Kiran Patel',
    faculty: 'Dr. Meenakshi Verma'
  }
];

const sampleEvents = [
  {
    id: '1',
    name: 'Hackathon 2025',
    description: 'A 24-hour coding competition to solve real-world problems using technology.',
    date: '2025-02-15',
    time: '09:00 AM',
    venue: 'Main Auditorium',
    clubId: '1',
    attendees: 120,
    status: 'upcoming',
    image: 'https://img.freepik.com/free-vector/hackathon-technology-infographic-with-flat-icons_88138-961.jpg?ga=GA1.1.1629250849.1720450330&semt=ais_hybrid'
  },
  {
    id: '2',
    name: 'Startup Pitch Day',
    description: 'Present your startup ideas to investors and win funding for your venture.',
    date: '2025-03-20',
    time: '10:00 AM',
    venue: 'Seminar Hall B',
    clubId: '2',
    attendees: 75,
    status: 'upcoming',
    image: 'https://img.freepik.com/free-photo/startup-business-progress-strategy-enterprise_53876-127927.jpg?ga=GA1.1.1629250849.1720450330&semt=ais_hybrid'
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
    image: 'https://img.freepik.com/premium-photo/modern-technologies-smart-school-clever-caucasian-pupils-use-virtual-reality-glasses-education_141188-4862.jpg?ga=GA1.1.1629250849.1720450330&semt=ais_hybrid'
  },
  {
    id: '4',
    name: 'Robotics Competition',
    description: 'Showcase your robotics skills and compete for exciting prizes.',
    date: '2025-04-10',
    time: '11:00 AM',
    venue: 'Engineering Block',
    clubId: '3',
    attendees: 50,
    status: 'upcoming',
    image: 'https://img.freepik.com/free-vector/robot-competition-illustration_1284-59228.jpg?ga=GA1.1.1629250849.1720450330&semt=ais_hybrid'
  }
];

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
    createdAt: '2024-12-18',
    tags: ['robotics', 'environment', 'sustainability']
  }
];

export const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setClubs(sampleClubs);
    setEvents(sampleEvents);
    setIdeas(sampleIdeas);
    setLoading(false);
  }, []);

  // Club related functions
  const getClubById = (id) => {
    return clubs.find(club => club.id === id);
  };

  const createClub = (clubData) => {
    const newClub = {
      id: Math.random().toString(36).substr(2, 9),
      ...clubData,
      members: 1,
      createdAt: new Date().toISOString().slice(0, 10),
      events: [],
      ideas: []
    };
    
    setClubs([...clubs, newClub]);
    return Promise.resolve(newClub);
  };

  const updateClub = (id, data) => {
    setClubs(clubs.map(club => (club.id === id ? { ...club, ...data } : club)));
    return Promise.resolve({ id, ...data });
  };

  const deleteClub = (id) => {
    setClubs(clubs.filter(club => club.id !== id));
    return Promise.resolve({ success: true });
  };

  // Event related functions
  const getEventById = (id) => {
    return events.find(event => event.id === id);
  };

  const getEventsByClubId = (clubId) => {
    return events.filter(event => event.clubId === clubId);
  };

  const createEvent = (eventData) => {
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      ...eventData,
      attendees: 0,
      status: 'upcoming'
    };
    
    setEvents([...events, newEvent]);
    
    // Update the club's events array
    if (eventData.clubId) {
      setClubs(clubs.map(club => {
        if (club.id === eventData.clubId) {
          return {
            ...club,
            events: [...club.events, newEvent.id]
          };
        }
        return club;
      }));
    }
    
    return Promise.resolve(newEvent);
  };

  const updateEvent = (id, data) => {
    setEvents(events.map(event => (event.id === id ? { ...event, ...data } : event)));
    return Promise.resolve({ id, ...data });
  };

  const deleteEvent = (id) => {
    const event = events.find(e => e.id === id);
    
    // Remove the event
    setEvents(events.filter(event => event.id !== id));
    
    // Update the club's events array
    if (event && event.clubId) {
      setClubs(clubs.map(club => {
        if (club.id === event.clubId) {
          return {
            ...club,
            events: club.events.filter(eventId => eventId !== id)
          };
        }
        return club;
      }));
    }
    
    return Promise.resolve({ success: true });
  };

  // Idea related functions
  const getIdeaById = (id) => {
    return ideas.find(idea => idea.id === id);
  };

  const getIdeasByClubId = (clubId) => {
    return ideas.filter(idea => idea.clubId === clubId);
  };

  const createIdea = (ideaData) => {
    const newIdea = {
      id: Math.random().toString(36).substr(2, 9),
      ...ideaData,
      votes: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'proposed'
    };
    
    setIdeas([...ideas, newIdea]);
    
    // Update the club's ideas array
    if (ideaData.clubId) {
      setClubs(clubs.map(club => {
        if (club.id === ideaData.clubId) {
          return {
            ...club,
            ideas: [...club.ideas, newIdea.id]
          };
        }
        return club;
      }));
    }
    
    return Promise.resolve(newIdea);
  };

  const updateIdea = (id, data) => {
    setIdeas(ideas.map(idea => (idea.id === id ? { ...idea, ...data } : idea)));
    return Promise.resolve({ id, ...data });
  };

  const deleteIdea = (id) => {
    const idea = ideas.find(i => i.id === id);
    
    // Remove the idea
    setIdeas(ideas.filter(idea => idea.id !== id));
    
    // Update the club's ideas array
    if (idea && idea.clubId) {
      setClubs(clubs.map(club => {
        if (club.id === idea.clubId) {
          return {
            ...club,
            ideas: club.ideas.filter(ideaId => ideaId !== id)
          };
        }
        return club;
      }));
    }
    
    return Promise.resolve({ success: true });
  };

  const voteIdea = (id) => {
    setIdeas(ideas.map(idea => {
      if (idea.id === id) {
        return { ...idea, votes: idea.votes + 1 };
      }
      return idea;
    }));
    
    return Promise.resolve({ success: true });
  };

  // Value for the context provider
  const value = {
    clubs,
    events,
    ideas,
    loading,
    // Club methods
    getClubById,
    createClub,
    updateClub,
    deleteClub,
    // Event methods
    getEventById,
    getEventsByClubId,
    createEvent,
    updateEvent,
    deleteEvent,
    // Idea methods
    getIdeaById,
    getIdeasByClubId,
    createIdea,
    updateIdea,
    deleteIdea,
    voteIdea
  };

  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
};