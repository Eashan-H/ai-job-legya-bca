import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import EventsPage from './components/EventsPage';
import SpaceMap from './components/SpaceMap';
import AboutPage from './components/AboutPage';
import PassesPage from './components/PassesPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage';
import Navigation from './components/Navigation';
import StarField from './components/StarField';
import CursorTrail from './components/CursorTrail';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleVideoPlayed = () => {
    setVideoPlayed(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onShowContent={setShowContent} videoPlayed={videoPlayed} onVideoPlayed={handleVideoPlayed} />;
      case 'events':
        return <EventsPage onNavigate={setCurrentPage} />;
      case 'map':
        return <SpaceMap />;
      case 'about':
        return <AboutPage />;
      case 'passes':
        return <PassesPage />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} onShowContent={setShowContent} videoPlayed={videoPlayed} onVideoPlayed={handleVideoPlayed} />;
    }
  };

  return (
    <div className="app">
      <StarField currentPage={currentPage} />
      <CursorTrail />
      {currentPage !== 'home' && (
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} showContent={true} />
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="page-container"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
