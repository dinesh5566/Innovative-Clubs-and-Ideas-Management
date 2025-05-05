import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ClubProvider } from './contexts/ClubContext';
import { NotificationProvider } from './contexts/NotificationContext';


// Import pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ClubsPage from './pages/ClubsPage';
import IdeasPage from './pages/IdeasPage';
import EventsPage from './pages/EventsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Import components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ClubDetails from './components/clubs/ClubDetails';
import CreateClub from './components/clubs/CreateClub';
import IdeaDetails from './components/ideas/IdeaDetails';
import CreateIdea from './components/ideas/CreateIdea';
import EventDetails from './components/events/EventDetails';
import CreateEvent from './components/events/CreateEvent';


// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ClubProvider>
          <NotificationProvider>
            <div className="app-container d-flex flex-column min-vh-100">
              <Navbar />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/clubs" element={<ClubsPage />} />
                  <Route path="/clubs/create" element={<CreateClub />} />
                  <Route path="/clubs/:id" element={<ClubDetails />} />
                  <Route path="/ideas" element={<IdeasPage />} />
                  <Route path="/ideas/create" element={<CreateIdea />} />
                  <Route path="/ideas/:id" element={<IdeaDetails />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/events/create" element={<CreateEvent />} />
                  <Route path="/events/:id" element={<EventDetails />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </NotificationProvider>
        </ClubProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;