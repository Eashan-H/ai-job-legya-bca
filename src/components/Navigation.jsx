import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Navigation.css';

const Navigation = ({ currentPage, onNavigate, showContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, logout } = useAuth();

  const baseNavItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '✨' },
    { id: 'events', label: 'Events', icon: '🪐' },
    { id: 'map', label: 'Map', icon: '🗺️' },
    { id: 'passes', label: 'Passes', icon: '🎟️' },
  ];

  const navItems = user ? [...baseNavItems, { id: 'dashboard', label: 'Dashboard', icon: '🚀' }] : baseNavItems;

  return (
    <>
      {/* Floating Navigation Button */}
      <motion.div
        className="nav-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
        transition={{ delay: showContent ? 0.5 : 0, duration: 0.8 }}
        style={{ pointerEvents: showContent ? 'auto' : 'none' }}
      >
        <div className="nav-left">
          <motion.button
            className="nav-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? '✕' : '☰'}
            </motion.span>
          </motion.button>
        </div>

        {/* Expanded Navigation Menu */}
        <motion.div
          className="nav-menu"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0.8,
            y: isExpanded ? 0 : -20,
            pointerEvents: isExpanded ? 'auto' : 'none',
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => {
                onNavigate(item.id);
                setIsExpanded(false);
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                y: isExpanded ? 0 : -10,
              }}
              transition={{
                delay: isExpanded ? index * 0.1 : 0,
                duration: 0.3,
              }}
              whileHover={{
                scale: 1.05,
                x: 5,
                backgroundColor: 'rgba(147, 51, 234, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {currentPage === item.id && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="nav-right">
          {user ? (
            <>
              <span className="nav-user">{user.email}</span>
              <motion.button
                className="nav-auth-button"
                onClick={() => logout()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.button
              className="nav-auth-button"
              onClick={() => onNavigate('login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;
