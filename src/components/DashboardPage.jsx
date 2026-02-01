import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { events as allEvents } from './EventsPage.jsx'; // A bit of a hack, but works for now
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const { user, token } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (token) {
        const response = await fetch('/api/users/me/events/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setRegisteredEvents(data);
        }
      }
    };
    fetchRegisteredEvents();
  }, [token]);

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user ? user.email : 'Explorer'}</h1>
        <p className="dashboard-subtitle">Here are the events you've registered for.</p>
      </div>
      <div className="registered-events">
        {registeredEvents.length > 0 ? (
          <ul>
            {registeredEvents.map((registration) => {
              const event = allEvents.find(e => e.id === registration.event_id);
              return event ? <li key={registration.id}>{event.name}</li> : null;
            })}
          </ul>
        ) : (
          <p>You haven't registered for any events yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardPage;
